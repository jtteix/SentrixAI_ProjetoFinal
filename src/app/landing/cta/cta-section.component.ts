import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { LucideAngularModule, ArrowRight, Shield, Sparkles } from 'lucide-angular';
// 1. Importação da diretiva
// Corrija de './directives/...' para:
import { ScrollRevealDirective } from '../../shared/components/scroll/scroll-reveal.directive';@Component({
  selector: 'app-cta-section',
  standalone: true,
  imports: [
    CommonModule, 
    RouterLink, 
    LucideAngularModule,
    ScrollRevealDirective // 2. Adicionado aos imports
  ],
  templateUrl: './cta-section.component.html',
})
export class CtaSectionComponent {
  readonly ArrowRight = ArrowRight;
  readonly Shield = Shield;
  readonly Sparkles = Sparkles;
}