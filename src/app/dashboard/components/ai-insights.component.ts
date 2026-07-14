import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, Brain, Lightbulb, TrendingUp, AlertCircle, CheckCircle } from 'lucide-angular';

@Component({
  selector: 'app-ai-insights',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './ai-insights.component.html',
})
export class AiInsightsComponent {
  readonly Brain = Brain;

  insights = [
    { id: '1', type: 'recommendation', icon: Lightbulb,    title: 'Atualização de Firmware Recomendada', description: 'O módulo de comunicação V2X possui uma atualização de segurança disponível.', confidence: 95, action: 'Atualizar agora' },
    { id: '2', type: 'prediction',     icon: TrendingUp,   title: 'Padrão de Ataque Identificado',       description: 'Detectamos tentativas de scanning na rede CAN entre 14h-16h. Recomendamos monitoramento intensificado.', confidence: 87, action: '' },
    { id: '3', type: 'success',        icon: CheckCircle,  title: 'Proteção GPS Otimizada',              description: 'O algoritmo de detecção de spoofing foi aprimorado com novos dados de treinamento.', confidence: 99, action: '' },
    { id: '4', type: 'alert',          icon: AlertCircle,  title: 'Dispositivo Bluetooth Desconhecido',  description: 'Um dispositivo não autorizado tentou parear com o sistema de entretenimento.', confidence: 78, action: 'Revisar' },
  ];

  bgClass(t: string): string {
    return { recommendation: 'bg-primary/10', prediction: 'bg-accent/10', alert: 'bg-warning/10', success: 'bg-success/10' }[t] ?? '';
  }
  borderClass(t: string): string {
    return { recommendation: 'border-primary/20', prediction: 'border-accent/20', alert: 'border-warning/20', success: 'border-success/20' }[t] ?? '';
  }
  iconClass(t: string): string {
    return { recommendation: 'text-primary', prediction: 'text-accent', alert: 'text-warning', success: 'text-success' }[t] ?? '';
  }
}
