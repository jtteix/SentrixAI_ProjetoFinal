import {
  Component, OnDestroy, OnInit, ChangeDetectorRef, ChangeDetectionStrategy,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import {
  LucideAngularModule, Shield, Play, Square, AlertTriangle,
  CheckCircle, Wifi, Radio, Bluetooth, MapPin, Gauge,
  Thermometer, Battery, Lock, X, Zap, Activity,
} from 'lucide-angular';
import { DashboardHeaderComponent } from '../layout/dashboard-header.component';
import { SALVADOR_ROUTE, SECURITY_EVENTS, RoutePoint, SecurityEvent } from './simulator.data';

export type SimState = 'idle' | 'running' | 'paused' | 'finished';

@Component({
  selector: 'app-simulator',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, RouterLink, LucideAngularModule, DashboardHeaderComponent],
  templateUrl: './simulator.component.html',
})
export class SimulatorComponent implements OnInit, OnDestroy {
  // Icons
  readonly Shield = Shield; readonly Play = Play; readonly Square = Square;
  readonly AlertTriangle = AlertTriangle; readonly CheckCircle = CheckCircle;
  readonly Wifi = Wifi; readonly Radio = Radio; readonly Bluetooth = Bluetooth;
  readonly MapPin = MapPin; readonly Gauge = Gauge; readonly Thermometer = Thermometer;
  readonly Battery = Battery; readonly Lock = Lock; readonly X = X;
  readonly Zap = Zap; readonly Activity = Activity;

  // Route data
  readonly route = SALVADOR_ROUTE;
  readonly totalPoints = SALVADOR_ROUTE.length - 1;

  // State
  simState: SimState = 'idle';
  routeIndex = 0;          // current point index (float for interpolation)
  safeModeActive = false;
  safeModeCooldown = false;

  // HUD data (interpolated)
  speed = 0;
  engineTemp = 78;
  battery = 100;
  securityScore = 94;
  lat = -13.0100;
  lng = -38.5320;
  locationLabel = 'Shopping Barra';

  // Events
  activeEvent: SecurityEvent | null = null;
  resolvedEvents: string[] = [];
  eventLog: { time: string; msg: string; severity: string }[] = [];
  safeModeCountdown = 10;
  private countdownTimer: any = null;

  // Timers
  private driveTimer: any = null;
  private TICK_MS = 400; // ms between ticks
  private POINTS_PER_TICK = 0.18; // how fast to advance

  // Progress
  get progressPct(): number { return (this.routeIndex / this.totalPoints) * 100; }
  get currentPt(): RoutePoint { return this.route[Math.floor(this.routeIndex)]; }
  get nextPt(): RoutePoint | null {
    const ni = Math.floor(this.routeIndex) + 1;
    return ni < this.route.length ? this.route[ni] : null;
  }

  // SVG vehicle position (interpolated)
  get vehicleX(): number {
    const i = Math.floor(this.routeIndex);
    const frac = this.routeIndex - i;
    const cur = this.route[i];
    const nxt = this.route[Math.min(i + 1, this.route.length - 1)];
    return cur.x + (nxt.x - cur.x) * frac;
  }
  get vehicleY(): number {
    const i = Math.floor(this.routeIndex);
    const frac = this.routeIndex - i;
    const cur = this.route[i];
    const nxt = this.route[Math.min(i + 1, this.route.length - 1)];
    return cur.y + (nxt.y - cur.y) * frac;
  }

  // Path string for SVG polyline (route drawn so far)
  get travelledPath(): string {
    const idx = Math.floor(this.routeIndex);
    return this.route.slice(0, idx + 2).map((p, i) => `${i === 0 ? 'M' : 'L'}${p.x},${p.y}`).join(' ');
  }
  get fullPath(): string {
    return this.route.map((p, i) => `${i === 0 ? 'M' : 'L'}${p.x},${p.y}`).join(' ');
  }

  // Landmark labels
  get landmarks(): RoutePoint[] { return this.route.filter(p => p.label); }

  // Systems health
  get systems() {
    return [
      { name: 'CAN Bus',   ok: !this.hasActiveType('CAN Bus'),   icon: this.Activity  },
      { name: 'GPS',       ok: !this.hasActiveType('GPS'),        icon: this.MapPin    },
      { name: 'Bluetooth', ok: !this.hasActiveType('Bluetooth'), icon: this.Bluetooth },
      { name: 'Chave',     ok: !this.hasActiveType('Key'),        icon: this.Shield    },
    ];
  }
  hasActiveType(t: string): boolean { return !!this.activeEvent && this.activeEvent.type.includes(t); }

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit(): void { this.addLog('Sistema SENTRIX AI inicializado.', 'info'); }
  ngOnDestroy(): void { this.stopTimers(); }

  // ─── Controls ─────────────────────────────────────────────────
  start(): void {
    if (this.simState === 'finished') this.reset();
    this.simState = 'running';
    this.addLog('Simulação iniciada. Rota: Barra → Aeroporto.', 'info');
    this.tick();
  }

  pause(): void {
    this.simState = 'paused';
    this.stopTimers();
  }

  reset(): void {
    this.stopTimers();
    this.routeIndex = 0;
    this.simState = 'idle';
    this.safeModeActive = false;
    this.safeModeCooldown = false;
    this.activeEvent = null;
    this.resolvedEvents = [];
    this.eventLog = [];
    this.securityScore = 94;
    this.safeModeCountdown = 10;
    this.speed = 0;
    this.engineTemp = 78;
    this.battery = 100;
    this.lat = this.route[0].lat;
    this.lng = this.route[0].lng;
    this.locationLabel = this.route[0].label ?? '';
    this.addLog('Sistema SENTRIX AI inicializado.', 'info');
    this.cdr.markForCheck();
  }

  private tick(): void {
    this.driveTimer = setTimeout(() => {
      if (this.simState !== 'running') return;

      // Advance route
      const speed = this.safeModeActive ? this.POINTS_PER_TICK * 0.6 : this.POINTS_PER_TICK;
      this.routeIndex = Math.min(this.routeIndex + speed, this.totalPoints);

      // Interpolate HUD values
      const i = Math.floor(this.routeIndex);
      const frac = this.routeIndex - i;
      const cur = this.route[i];
      const nxt = this.route[Math.min(i + 1, this.route.length - 1)];
      const lerp = (a: number, b: number) => a + (b - a) * frac;

      this.speed = this.safeModeActive
        ? Math.min(Math.round(lerp(cur.speed, nxt.speed)), 80)
        : Math.round(lerp(cur.speed, nxt.speed));
      this.engineTemp = Math.round(lerp(cur.engineTemp, nxt.engineTemp));
      this.battery = Math.round(lerp(cur.battery, nxt.battery));
      this.lat = lerp(cur.lat, nxt.lat);
      this.lng = lerp(cur.lng, nxt.lng);

      // Update label
      for (const p of this.route) {
        if (p.label && Math.abs(p.x - this.vehicleX) < 20) {
          this.locationLabel = p.label;
        }
      }

      // Check events
      this.checkEvents();

      // Score fluctuation
      if (this.activeEvent) {
        const drop: Record<string, number> = { low: 2, medium: 5, high: 10, critical: 18 };
        this.securityScore = Math.max(40, this.securityScore - 0.05 * (drop[this.activeEvent.severity] ?? 5));
      } else {
        this.securityScore = Math.min(98, this.securityScore + 0.08);
      }

      // Finish
      if (this.routeIndex >= this.totalPoints) {
        this.simState = 'finished';
        this.speed = 0;
        this.addLog('Destino alcançado: Aeroporto de Salvador. Simulação concluída.', 'success');
        this.cdr.markForCheck();
        return;
      }

      this.cdr.markForCheck();
      this.tick();
    }, this.TICK_MS);
  }

  private checkEvents(): void {
    for (const ev of SECURITY_EVENTS) {
      if (
        this.routeIndex >= ev.routeIndex &&
        !this.resolvedEvents.includes(ev.id) &&
        this.activeEvent?.id !== ev.id
      ) {
        this.triggerEvent(ev);
        break;
      }
    }
  }

  private triggerEvent(ev: SecurityEvent): void {
    this.activeEvent = ev;
    const sev = { low: '🟡', medium: '🟠', high: '🔴', critical: '🚨' }[ev.severity] ?? '⚠️';
    this.addLog(`${sev} ${ev.title}`, ev.severity);

    if (ev.requiresSafeMode) {
      this.safeModeCountdown = 10;
      this.startCountdown();
    } else if (ev.autoResolveAfter) {
      setTimeout(() => { if (this.activeEvent?.id === ev.id) this.resolveEvent(ev.id, true); }, ev.autoResolveAfter * 1000);
    }
  }

  private startCountdown(): void {
    clearInterval(this.countdownTimer);
    this.countdownTimer = setInterval(() => {
      this.safeModeCountdown--;
      if (this.safeModeCountdown <= 0) {
        clearInterval(this.countdownTimer);
        this.activateSafeMode(true);
      }
      this.cdr.markForCheck();
    }, 1000);
  }

  activateSafeMode(auto = false): void {
    clearInterval(this.countdownTimer);
    this.safeModeActive = true;
    this.safeModeCooldown = true;
    const who = auto ? 'automaticamente pela IA' : 'pelo motorista';
    this.addLog(`🛡️ Modo Seguro ATIVADO ${who}. Velocidade limitada a 80 km/h.`, 'success');
    if (this.activeEvent?.requiresSafeMode) {
      setTimeout(() => this.resolveEvent(this.activeEvent!.id, false), 4000);
    }
    this.cdr.markForCheck();
  }

  deactivateSafeMode(): void {
    this.safeModeActive = false;
    this.safeModeCooldown = false;
    this.addLog('🔓 Modo Seguro desativado. Sistemas normalizados.', 'info');
    this.cdr.markForCheck();
  }

  dismissAlert(): void {
    if (!this.activeEvent) return;
    if (this.activeEvent.requiresSafeMode && !this.safeModeActive) return; // can't dismiss critical without action
    this.resolveEvent(this.activeEvent.id, true);
  }

  private resolveEvent(id: string, auto: boolean): void {
    clearInterval(this.countdownTimer);
    this.resolvedEvents.push(id);
    const ev = SECURITY_EVENTS.find(e => e.id === id);
    if (ev) this.addLog(`✅ Ameaça resolvida: ${ev.title}`, 'success');
    if (this.activeEvent?.id === id) this.activeEvent = null;
    this.cdr.markForCheck();
  }

  private stopTimers(): void {
    clearTimeout(this.driveTimer);
    clearInterval(this.countdownTimer);
  }

  private addLog(msg: string, severity: string): void {
    const now = new Date();
    const time = `${now.getHours().toString().padStart(2,'0')}:${now.getMinutes().toString().padStart(2,'0')}:${now.getSeconds().toString().padStart(2,'0')}`;
    this.eventLog.unshift({ time, msg, severity });
    if (this.eventLog.length > 12) this.eventLog.pop();
  }

  // ─── Helpers for template ──────────────────────────────────────
  get scoreColor(): string {
    const s = this.securityScore;
    return s >= 80 ? 'text-success' : s >= 60 ? 'text-warning' : 'text-danger';
  }
  get speedColor(): string { return this.speed > 80 ? 'text-warning' : 'text-foreground'; }

  borderSeverity(s: string): string {
    return { low: 'border-warning/40', medium: 'border-warning/60', high: 'border-danger/60', critical: 'border-danger' }[s] ?? 'border-border';
  }
  bgSeverity(s: string): string {
    return { low: 'bg-warning/5', medium: 'bg-warning/10', high: 'bg-danger/10', critical: 'bg-danger/15' }[s] ?? '';
  }
  iconSeverity(s: string): string {
    return { low: 'text-warning', medium: 'text-warning', high: 'text-danger', critical: 'text-danger' }[s] ?? '';
  }
  logColor(s: string): string {
    return { success: 'text-success', high: 'text-danger', critical: 'text-danger', medium: 'text-warning', info: 'text-muted-foreground' }[s] ?? 'text-muted-foreground';
  }
  round(n: number): number { return Math.round(n); }
}
