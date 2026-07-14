import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { LucideAngularModule, ChevronLeft, ChevronRight, ArrowRight, LayoutDashboard, AlertTriangle, Brain, Activity, MapPin, Lock, Eye } from 'lucide-angular';
// 1. Importação da diretiva
import { ScrollRevealDirective } from '../../shared/components/scroll/scroll-reveal.directive';interface SlideScreen {
  id: string;
  title: string;
  subtitle: string;
  icon: any;
  badgeColor: string;
  badge: string;
}

@Component({
  selector: 'app-dashboard-carousel',
  standalone: true,
  imports: [
    CommonModule, 
    RouterLink, 
    LucideAngularModule,
    ScrollRevealDirective // 2. Adicionado aos imports
  ],
  templateUrl: './dashboard-carousel.component.html',
})
export class DashboardCarouselComponent implements OnInit, OnDestroy {
  readonly ChevronLeft = ChevronLeft;
  readonly ChevronRight = ChevronRight;
  readonly ArrowRight = ArrowRight;

  current = 0;
  private timer: any;

  slides: SlideScreen[] = [
    { id: 'overview',   title: 'Dashboard Geral',      subtitle: 'Visão completa do status de segurança em tempo real',     icon: LayoutDashboard, badge: 'Overview',    badgeColor: 'text-primary bg-primary/10' },
    { id: 'threats',    title: 'Central de Ameaças',      subtitle: 'Detecte e bloqueie intrusões automaticamente com IA',     icon: AlertTriangle,   badge: 'Ameaças',     badgeColor: 'text-danger bg-danger/10'   },
    { id: 'ai',         title: 'Análise de IA',           subtitle: 'Machine learning treinado para padrões de ataque veicular', icon: Brain,           badge: 'AI Engine',   badgeColor: 'text-accent bg-accent/10'   },
    { id: 'monitoring', title: 'Monitoramento',           subtitle: 'Acompanhe CAN Bus, ECUs e comunicações em tempo real',    icon: Activity,        badge: 'Sistemas',    badgeColor: 'text-success bg-success/10' },
    { id: 'location',   title: 'Localização & GPS',       subtitle: 'Anti-spoofing GPS com rastreamento seguro de localização', icon: MapPin,          badge: 'GPS',         badgeColor: 'text-warning bg-warning/10' },
    { id: 'safe-mode',  title: 'Modo Seguro',             subtitle: 'Isolamento de emergência em um clique para sua proteção', icon: Lock,            badge: 'Emergência',  badgeColor: 'text-danger bg-danger/10'   },
    { id: 'privacy',    title: 'Central de Privacidade',  subtitle: 'Controle total sobre seus dados. Conformidade LGPD.',     icon: Eye,             badge: 'LGPD',        badgeColor: 'text-success bg-success/10' },
  ];

  slideStats: Record<string, Array<{ label: string; value: string; color: string }>> = {
    overview:   [{ label: 'Security Score', value: '94/100', color: 'text-primary' }, { label: 'Ameaças hoje', value: '47', color: 'text-warning' }, { label: 'Uptime', value: '99.97%', color: 'text-success' }],
    threats:    [{ label: 'Críticas', value: '3', color: 'text-danger' }, { label: 'Bloqueadas', value: '45', color: 'text-success' }, { label: 'Em análise', value: '2', color: 'text-warning' }],
    ai:         [{ label: 'Confiança', value: '95%', color: 'text-primary' }, { label: 'Eventos', value: '2.4M', color: 'text-accent' }, { label: 'Resposta', value: '<10ms', color: 'text-success' }],
    monitoring: [{ label: 'Sistemas', value: '8/8', color: 'text-success' }, { label: 'CAN msgs/s', value: '1247', color: 'text-primary' }, { label: 'ECUs', value: '32', color: 'text-accent' }],
    location:   [{ label: 'Precisão', value: '±2.5m', color: 'text-primary' }, { label: 'Satélites', value: '12', color: 'text-success' }, { label: 'Spoofing', value: 'Bloqueado', color: 'text-danger' }],
    'safe-mode':[{ label: 'Status', value: 'Ativo', color: 'text-success' }, { label: 'Protocolos', value: '5/5', color: 'text-primary' }, { label: 'Velocidade', value: 'Normal', color: 'text-success' }],
    privacy:    [{ label: 'LGPD', value: 'Conforme', color: 'text-success' }, { label: 'Dados', value: '2.4 GB', color: 'text-primary' }, { label: 'Externos', value: '0', color: 'text-success' }],
  };

  slideLogs: Record<string, string[]> = {
    overview:   ['[14:32:15] ✓ Sistema inicializado', '[14:32:16] ✓ 8 módulos online', '[14:32:20] ⚡ Score: 94/100'],
    threats:    ['[14:31:02] ⚠ CAN intrusion blocked', '[14:31:45] ✓ GPS spoofing rejected', '[14:32:10] ⚠ BT unknown device'],
    ai:         ['[14:30:00] 🧠 Model v3.2 loaded', '[14:31:10] ✓ Pattern match: 95%', '[14:32:05] ⚡ Prediction updated'],
    monitoring: ['[14:29:50] ✓ ECU scan complete', '[14:30:30] ✓ CAN Bus normal', '[14:31:55] ✓ 5G connected'],
    location:   ['[14:28:42] ✓ GPS integrity OK', '[14:30:00] ⚠ Spoof attempt blocked', '[14:32:00] ✓ 12 satellites lock'],
    'safe-mode':['[14:20:18] ✓ Safe mode deactivated', '[14:25:00] ✓ Systems normalized', '[14:32:00] ✓ All clear'],
    privacy:    ['[14:15:00] ✓ LGPD audit passed', '[14:20:00] ✓ No data shared', '[14:32:00] ✓ Consent updated'],
  };

  get currentSlide(): SlideScreen { return this.slides[this.current]; }
  get currentStats() { return this.slideStats[this.currentSlide.id] ?? []; }
  get currentLogs() { return this.slideLogs[this.currentSlide.id] ?? []; }

  ngOnInit(): void { this.startTimer(); }
  ngOnDestroy(): void { clearInterval(this.timer); }

  private startTimer(): void {
    this.timer = setInterval(() => this.next(), 4500);
  }

  private resetTimer(): void {
    clearInterval(this.timer);
    this.startTimer();
  }

  next(): void {
    this.current = (this.current + 1) % this.slides.length;
    this.resetTimer();
  }

  prev(): void {
    this.current = (this.current - 1 + this.slides.length) % this.slides.length;
    this.resetTimer();
  }

  goTo(i: number): void {
    this.current = i;
    this.resetTimer();
  }
}