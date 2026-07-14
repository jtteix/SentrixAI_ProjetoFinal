import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, Brain, Cpu, Database, Zap, TrendingUp, Target } from 'lucide-angular';
import { DashboardHeaderComponent } from '../layout/dashboard-header.component';
import { AiInsightsComponent } from '../components/ai-insights.component';

@Component({
  selector: 'app-ai-analysis',
  standalone: true,
  imports: [CommonModule, LucideAngularModule, DashboardHeaderComponent, AiInsightsComponent],
  templateUrl: './ai-analysis.component.html',
})
export class AiAnalysisComponent {
  readonly TrendingUp = TrendingUp;
  readonly Target = Target;
  readonly Brain = Brain;

  aiStats = [
    { icon: Cpu,      label: 'Modelo Ativo',        value: 'SENTRIX ML v3.2', detail: 'Última atualização: 2h atrás', color: 'text-primary' },
    { icon: Database, label: 'Dados Processados',   value: '2.4M eventos',    detail: 'Últimas 24 horas',             color: 'text-accent'  },
    { icon: Zap,      label: 'Tempo de Resposta',   value: '< 10ms',          detail: 'Edge computing ativo',         color: 'text-success' },
  ];

  categories = [
    { category: 'Network Intrusion', count: 45, percentage: 35 },
    { category: 'GPS Spoofing',      count: 23, percentage: 18 },
    { category: 'Bluetooth Attack',  count: 19, percentage: 15 },
    { category: 'Key Relay',         count: 18, percentage: 14 },
    { category: 'Anomaly',           count: 12, percentage: 10 },
    { category: 'Outros',            count: 10, percentage: 8  },
  ];

  predictions = [
    { title: 'Próxima Janela de Risco', prediction: '14:00 - 16:00',    confidence: 87, description: 'Baseado em padrões históricos de ataques' },
    { title: 'Vetor de Ataque Provável', prediction: 'CAN Bus Injection', confidence: 92, description: 'Análise de tentativas recentes'           },
    { title: 'Recomendação de Ação',     prediction: 'Atualizar Firewall', confidence: 95, description: 'Nova regra disponível para download'     },
  ];
}
