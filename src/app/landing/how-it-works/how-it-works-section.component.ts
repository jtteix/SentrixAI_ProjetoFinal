import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, Car, Brain, Lock, ArrowRight, BarChart2, Shield, Radio } from 'lucide-angular';
// 1. Importação da diretiva
import { ScrollRevealDirective } from '../../shared/components/scroll/scroll-reveal.directive';@Component({
  selector: 'app-how-it-works-section',
  standalone: true,
  imports: [
    CommonModule, 
    LucideAngularModule,
    ScrollRevealDirective // 2. Adicionado aos imports
  ],
  templateUrl: './how-it-works-section.component.html',
})
export class HowItWorksSectionComponent {
  readonly Radio = Radio;
  readonly ArrowRight = ArrowRight;

  steps = [
    { number: '01', icon: Car,       title: 'Conexão do Veículo',       description: 'Integração segura com os sistemas do veículo através de APIs protegidas e protocolos criptografados.', details: ['OBD-II', 'CAN Bus', 'APIs OEM', 'Telemetria'] },
    { number: '02', icon: Radio,    title: 'Monitoramento de Ameaças',  description: 'Vigilância contínua 24/7 de todos os pontos de entrada e comunicações do veículo.',                  details: ['Rede veicular', 'Bluetooth', 'Wi-Fi', 'Celular'] },
    { number: '03', icon: Brain,    title: 'Detecção por IA',           description: 'Algoritmos de machine learning identificam padrões suspeitos e comportamentos anômalos.',               details: ['Neural networks', 'Anomaly detection', 'Pattern matching', 'Real-time'] },
    { number: '04', icon: BarChart2,title: 'Análise de Risco',          description: 'Classificação automática de ameaças com base em severidade, impacto e probabilidade.',                  details: ['Risk scoring', 'Threat intel', 'Context analysis', 'Prioritization'] },
    { number: '05', icon: Shield,   title: 'Resposta Automatizada',     description: 'Ações de proteção executadas automaticamente para neutralizar ameaças em milissegundos.',               details: ['Auto-block', 'Safe mode', 'Alertas', 'Quarantine'] },
    { number: '06', icon: Lock,     title: 'Proteção de Privacidade',   description: 'Todos os dados são criptografados e processados em conformidade com LGPD e regulamentações.',          details: ['End-to-end encryption', 'Data minimization', 'Consent', 'LGPD'] },
  ];

  showArrow(index: number): boolean {
    return index < this.steps.length - 1 && (index + 1) % 3 !== 0;
  }
}