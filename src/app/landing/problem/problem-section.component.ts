import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, AlertTriangle, Car, Wifi, Lock, Shield, Radio } from 'lucide-angular';
// 1. Importação da diretiva
import { ScrollRevealDirective } from '../../shared/components/scroll/scroll-reveal.directive';@Component({
  selector: 'app-problem-section',
  standalone: true,
  imports: [
    CommonModule, 
    LucideAngularModule,
    ScrollRevealDirective // 2. Adicionado aos imports
  ],
  templateUrl: './problem-section.component.html',
})
export class ProblemSectionComponent {
  readonly AlertTriangle = AlertTriangle;
  readonly Shield = Shield;

  threats = [
    {
      year: '2015',
      title: 'Jeep Cherokee Hack',
      description: 'Hackers assumiram controle remoto de um veículo em movimento através do sistema de entretenimento.',
      icon: Car,
      severity: 'critical',
      url: 'https://www.wired.com/2015/07/hackers-remotely-kill-jeep-highway/'
    },
    {
      year: '2020 - 2024',
      title: 'Tesla Key Fob Attack',
      description: 'Vulnerabilidade no protocolo de chave permitia que atacantes clonassem o sinal e roubassem veículos.',
      icon: Radio,
      severity: 'high',
      url: 'https://www.wired.com/story/tesla-ultra-wideband-radio-relay-attacks/?utm_source=chatgpt.com/'
    },
    {
      year: '2023',
      title: 'Keyless Relay Attacks',
      description: 'Criminosos amplificam o sinal da chave para destravar e dar partida em veículos à distância.',
      icon: Wifi,
      severity: 'high',
      url: 'https://canaltech.com.br/carros/relay-attack-novo-golpe-clona-chave-do-seu-carro-a-distancia-266455/?utm_source=chatgpt.com'
    },
    {
      year: '2024',
      title: 'Connected Vehicle APIs',
      description: 'APIs de fabricantes expuseram dados de milhões de veículos, incluindo localização em tempo real.',
      icon: Lock,
      severity: 'critical',
      url: 'https://samcurry.net/web-hackers-vs-the-auto-industry'
    },
  ];

  stats = [
    { value: '150M+', label: 'Veículos conectados em risco' },
    { value: '40%', label: 'Aumento em ataques por ano' },
    { value: '$500B', label: 'Mercado de mobilidade até 2030' },
    { value: '67%', label: 'Veículos vulneráveis a hacks' },
  ];
}