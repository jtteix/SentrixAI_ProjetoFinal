import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, AlertTriangle, Filter, Download, RefreshCw } from 'lucide-angular';
import { DashboardHeaderComponent } from '../layout/dashboard-header.component';
import { ThreatListComponent, ThreatAlert } from '../components/threat-list.component';
import { ThreatChartComponent } from '../components/threat-chart.component';

@Component({
  selector: 'app-threats',
  standalone: true,
  imports: [CommonModule, LucideAngularModule, DashboardHeaderComponent, ThreatListComponent, ThreatChartComponent],
  templateUrl: './threats.component.html',
})
export class ThreatsComponent {
  readonly AlertTriangle = AlertTriangle;
  readonly Filter = Filter;
  readonly Download = Download;
  readonly RefreshCw = RefreshCw;

  stats = [
    { label: 'Total Hoje', value: '47', color: 'text-foreground' },
    { label: 'Críticas',   value: '3',  color: 'text-danger'     },
    { label: 'Bloqueadas', value: '45', color: 'text-success'    },
    { label: 'Em Análise', value: '2',  color: 'text-warning'    },
  ];

  threats: ThreatAlert[] = [
    { id: '1', type: 'Network Intrusion',  message: 'Tentativa de acesso não autorizado à rede CAN detectada no barramento principal', severity: 'critical', timestamp: 'Há 2 minutos',  status: 'blocked'  },
    { id: '2', type: 'GPS Spoofing',       message: 'Coordenadas GPS falsas detectadas - tentativa de redirecionamento bloqueada',     severity: 'critical', timestamp: 'Há 15 minutos', status: 'blocked'  },
    { id: '3', type: 'Bluetooth Attack',   message: 'Dispositivo Bluetooth desconhecido tentou parear com sistema de entretenimento',  severity: 'high',     timestamp: 'Há 32 minutos', status: 'blocked'  },
    { id: '4', type: 'Anomaly Detection',  message: 'Padrão de tráfego incomum detectado no módulo de telemetria',                    severity: 'medium',   timestamp: 'Há 1 hora',     status: 'resolved' },
    { id: '5', type: 'Key Fob Relay',      message: 'Tentativa de relay attack no sistema de chave detectada',                         severity: 'high',     timestamp: 'Há 2 horas',    status: 'blocked'  },
    { id: '6', type: 'Firmware Tampering', message: 'Verificação de integridade falhou em ECU secundária - restaurado',               severity: 'critical', timestamp: 'Há 3 horas',    status: 'resolved' },
    { id: '7', type: 'DoS Attack',         message: 'Flood de mensagens CAN detectado e mitigado automaticamente',                    severity: 'high',     timestamp: 'Há 5 horas',    status: 'blocked'  },
    { id: '8', type: 'Unauthorized Access',message: 'Tentativa de acesso à API de diagnóstico sem autenticação',                      severity: 'medium',   timestamp: 'Há 8 horas',    status: 'blocked'  },
  ];
}
