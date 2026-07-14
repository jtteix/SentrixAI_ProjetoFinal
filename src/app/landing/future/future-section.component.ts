import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, Car, Cpu, Globe, Zap } from 'lucide-angular';
// 1. Importação da diretiva
import { ScrollRevealDirective } from '../../shared/components/scroll/scroll-reveal.directive';@Component({
  selector: 'app-future-section',
  standalone: true,
  imports: [
    CommonModule, 
    LucideAngularModule,
    ScrollRevealDirective // 2. Adicionado aos imports
  ],
  templateUrl: './future-section.component.html',
})
export class FutureSectionComponent {
  readonly Globe = Globe;

  cards = [
    { icon: Car,  title: 'Veículos Autônomos', description: 'Level 4 e 5 de autonomia exigem zero falhas de segurança. Cada sistema precisa de proteção em múltiplas camadas.', stat: '2030',  statLabel: 'Mainstream adoption' },
    { icon: Cpu,  title: 'AI-Driven Security', description: 'Machine learning em edge computing para decisões de segurança em milissegundos, diretamente no veículo.',          stat: '10ms',  statLabel: 'Response time' },
    { icon: Zap,  title: 'V2X Communication',  description: 'Veículos conversando com infraestrutura, outros veículos e pedestres. Cada conexão é um vetor de ataque.',          stat: '5G+',   statLabel: 'Network enabled' },
  ];
}