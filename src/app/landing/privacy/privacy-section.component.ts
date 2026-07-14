import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, Shield, Lock, Eye, FileText, Database, UserCheck, CheckCircle } from 'lucide-angular';
// 1. Importação da diretiva
import { ScrollRevealDirective } from '../../shared/components/scroll/scroll-reveal.directive';@Component({
  selector: 'app-privacy-section',
  standalone: true,
  imports: [
    CommonModule, 
    LucideAngularModule,
    ScrollRevealDirective // 2. Adicionado aos imports
  ],
  templateUrl: './privacy-section.component.html',
})
export class PrivacySectionComponent {
  readonly Shield = Shield;
  readonly FileText = FileText;
  readonly CheckCircle = CheckCircle;

  privacyFeatures = [
    { icon: Lock,      title: 'Criptografia End-to-End', description: 'Todos os dados são criptografados em trânsito e em repouso usando AES-256.' },
    { icon: Eye,       title: 'Gestão de Consentimento', description: 'Controle granular sobre quais dados você compartilha e com quem.' },
    { icon: Database,  title: 'Minimização de Dados',    description: 'Coletamos apenas o necessário para proteger seu veículo.' },
    { icon: UserCheck, title: 'Direitos do Titular',     description: 'Acesso, correção e exclusão de dados conforme a LGPD.' },
  ];

  complianceItems = [
    'Lei Geral de Proteção de Dados (LGPD)',
    'ISO 27001 Information Security',
    'SOC 2 Type II Compliance',
    'GDPR Ready',
  ];
}