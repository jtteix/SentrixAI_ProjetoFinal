import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, Lock, Shield, AlertTriangle, Power, Zap, Radio, Car, CheckCircle } from 'lucide-angular';
import { DashboardHeaderComponent } from '../layout/dashboard-header.component';

@Component({
  selector: 'app-safe-mode',
  standalone: true,
  imports: [CommonModule, LucideAngularModule, DashboardHeaderComponent],
  templateUrl: './safe-mode.component.html',
})
export class SafeModeComponent {
  readonly Shield = Shield;
  readonly Power = Power;
  readonly Zap = Zap;
  readonly AlertTriangle = AlertTriangle;
  readonly Lock = Lock;
  readonly CheckCircle = CheckCircle;

  safeModeActive = false;

  systems = [
    { name: 'Motor & Transmissão',     icon: Car,   safeModeStatus: 'Limitado a 30km/h',  normalStatus: 'Normal',      priority: 'critical' },
    { name: 'Comunicações Externas',   icon: Radio, safeModeStatus: 'Apenas emergência',   normalStatus: 'Todas ativas', priority: 'high'    },
    { name: 'Sistema de Entretenimento', icon: Power, safeModeStatus: 'Desativado',         normalStatus: 'Ativo',        priority: 'low'    },
    { name: 'Telemetria',              icon: Zap,   safeModeStatus: 'Apenas críticos',     normalStatus: 'Completa',     priority: 'medium'  },
  ];

  protocols = [
    { step: 1, action: 'Isolar rede CAN de sistemas não críticos'   },
    { step: 2, action: 'Desativar comunicações Wi-Fi e Bluetooth'    },
    { step: 3, action: 'Limitar velocidade máxima a 30 km/h'        },
    { step: 4, action: 'Ativar logging intensivo de eventos'        },
    { step: 5, action: 'Enviar alerta para central de segurança'    },
  ];

  toggleSafeMode(): void {
    this.safeModeActive = !this.safeModeActive;
  }

  systemBg(priority: string): string {
    if (!this.safeModeActive) return 'bg-secondary/30 border-border';
    return priority === 'low' ? 'bg-danger/5 border-danger/20' : 'bg-warning/5 border-warning/20';
  }
  iconBg(priority: string): string {
    if (!this.safeModeActive) return 'bg-success/10';
    return priority === 'low' ? 'bg-danger/10' : 'bg-warning/10';
  }
  iconColor(priority: string): string {
    if (!this.safeModeActive) return 'text-success';
    return priority === 'low' ? 'text-danger' : 'text-warning';
  }
}
