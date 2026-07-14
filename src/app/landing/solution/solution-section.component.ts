import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, Shield, Brain, Activity, Lock, MapPin, Eye, Zap } from 'lucide-angular';
// 1. Importação da diretiva
import { ScrollRevealDirective } from '../../shared/components/scroll/scroll-reveal.directive';// lucide-angular doesn't export Fingerprint by name, we use an SVG fallback
@Component({
  selector: 'app-solution-section',
  standalone: true,
  imports: [
    CommonModule, 
    LucideAngularModule,
    ScrollRevealDirective // 2. Adicionado aos imports
  ],
  templateUrl: './solution-section.component.html',
})
export class SolutionSectionComponent {
  readonly Zap = Zap;
  readonly Shield = Shield;
  readonly Brain = Brain;

  features = [
    { icon: Shield, title: 'Detecção de Ameaças', description: 'Identificação em tempo real de tentativas de invasão, malware e comportamentos anômalos na rede do veículo.', color: 'primary' },
    { icon: Brain, title: 'Análise com IA', description: 'Algoritmos de machine learning que aprendem padrões normais e detectam anomalias automaticamente.', color: 'accent' },
    { icon: Activity, title: 'Monitoramento Veicular', description: 'Vigilância contínua de todos os sistemas críticos: CAN bus, ECUs, telemetria e comunicações.', color: 'primary' },
    { icon: Lock, title: 'Modo Seguro', description: 'Ativação automática de protocolos de emergência quando ameaças críticas são detectadas.', color: 'danger' },
    { icon: MapPin, title: 'Proteção GPS', description: 'Detecção e bloqueio de ataques de spoofing GPS que tentam falsificar a localização do veículo.', color: 'warning' },
    { icon: Eye, title: 'Central de Privacidade', description: 'Controle total sobre quais dados são coletados, armazenados e compartilhados. Conformidade LGPD.', color: 'success' },
  ];

  colorBg: Record<string, string> = {
    primary: 'bg-primary/10 text-primary border border-primary/20 hover:border-primary/40',
    accent:  'bg-accent/10 text-accent border border-accent/20 hover:border-accent/40',
    danger:  'bg-danger/10 text-danger border border-danger/20 hover:border-danger/40',
    warning: 'bg-warning/10 text-warning border border-warning/20 hover:border-warning/40',
    success: 'bg-success/10 text-success border border-success/20 hover:border-success/40',
  };
}