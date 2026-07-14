import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { LucideAngularModule, Shield, AlertTriangle, Activity, Brain, Clock, Target } from 'lucide-angular';
import { DashboardHeaderComponent } from '../layout/dashboard-header.component';
import { StatCardComponent } from '../components/stat-card.component';
import { SecurityScoreComponent } from '../components/security-score.component';
import { ThreatListComponent, ThreatAlert } from '../components/threat-list.component';
import { ThreatChartComponent } from '../components/threat-chart.component';
import { VehicleStatusComponent } from '../components/vehicle-status.component';
import { AiInsightsComponent } from '../components/ai-insights.component';
import { SecurityLogsComponent } from '../components/security-logs.component';

@Component({
  selector: 'app-dashboard-overview',
  standalone: true,
  imports: [
    CommonModule, RouterLink, LucideAngularModule,
    DashboardHeaderComponent, StatCardComponent, SecurityScoreComponent,
    ThreatListComponent, ThreatChartComponent, VehicleStatusComponent,
    AiInsightsComponent, SecurityLogsComponent,
  ],
  templateUrl: './overview.component.html',
})
export class OverviewComponent {
  readonly Shield = Shield;
  readonly AlertTriangle = AlertTriangle;
  readonly Activity = Activity;
  readonly Brain = Brain;
  readonly Clock = Clock;
  readonly Target = Target;

  stats = [
    { title: 'Security Score',       value: '94/100', change: '+2 esta semana', changeType: 'positive' as const, icon: Shield,        iconColor: 'text-primary' },
    { title: 'Ameaças Bloqueadas',   value: '127',    change: '+23 hoje',       changeType: 'neutral'  as const, icon: AlertTriangle, iconColor: 'text-warning' },
    { title: 'Uptime do Sistema',    value: '99.97%', change: '30 dias',        changeType: 'positive' as const, icon: Activity,      iconColor: 'text-success' },
    { title: 'Análises da IA',       value: '1.847',  change: 'Este mês',       changeType: 'neutral'  as const, icon: Brain,         iconColor: 'text-accent'  },
  ];

  recentThreats: ThreatAlert[] = [
    { id: '1', type: 'Network Intrusion', message: 'Tentativa de acesso não autorizado à rede CAN',       severity: 'high',     timestamp: 'Há 2 minutos',  status: 'blocked'  },
    { id: '2', type: 'GPS Spoofing',      message: 'Coordenadas GPS falsas detectadas e rejeitadas',      severity: 'critical', timestamp: 'Há 15 minutos', status: 'blocked'  },
    { id: '3', type: 'Anomaly Detection', message: 'Padrão de tráfego incomum no módulo de telemetria',  severity: 'medium',   timestamp: 'Há 1 hora',     status: 'resolved' },
  ];
}
