import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, Activity, Wifi, Radio, Cpu, Lock, MapPin, Bluetooth, Car } from 'lucide-angular';

@Component({
  selector: 'app-vehicle-status',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  template: `
    <div class="grid grid-cols-2 md:grid-cols-4 gap-3">
      <div *ngFor="let system of systems"
           class="p-4 rounded-xl border transition-all hover:scale-105"
           [ngClass]="bgClass(system.status)">
        <div class="flex items-center gap-3">
          <div class="p-2 rounded-lg" [ngClass]="bgClass(system.status)">
            <lucide-icon [img]="system.icon" class="h-4 w-4" [ngClass]="iconClass(system.status)"></lucide-icon>
          </div>
          <div class="flex-1 min-w-0">
            <p class="text-sm font-medium truncate">{{ system.name }}</p>
            <div class="flex items-center gap-2">
              <div class="w-1.5 h-1.5 rounded-full" [ngClass]="[dotClass(system.status), system.status === 'online' ? 'animate-pulse' : '']"></div>
              <span class="text-xs text-muted-foreground truncate">{{ system.details }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
})
export class VehicleStatusComponent {
  systems = [
    { name: 'CAN Bus',      status: 'online',   icon: Activity,  details: 'Tráfego normal' },
    { name: 'Wi-Fi',        status: 'online',   icon: Wifi,      details: 'Conexão segura' },
    { name: 'Bluetooth',    status: 'warning',  icon: Bluetooth, details: 'Disp. desconhecido' },
    { name: 'Celular',      status: 'online',   icon: Radio,     details: '5G conectado' },
    { name: 'ECU',          status: 'online',   icon: Cpu,       details: '32 módulos ativos' },
    { name: 'GPS',          status: 'online',   icon: MapPin,    details: 'Sinal forte' },
    { name: 'Imobilizador', status: 'online',   icon: Lock,      details: 'Ativo' },
    { name: 'Telemetria',   status: 'online',   icon: Car,       details: 'Streaming' },
  ];

  bgClass(s: string): string {
    return { online: 'bg-success/10 border-success/20', warning: 'bg-warning/10 border-warning/20', offline: 'bg-danger/10 border-danger/20' }[s] ?? '';
  }
  iconClass(s: string): string {
    return { online: 'text-success', warning: 'text-warning', offline: 'text-danger' }[s] ?? '';
  }
  dotClass(s: string): string {
    return { online: 'bg-success', warning: 'bg-warning', offline: 'bg-danger' }[s] ?? '';
  }
}
