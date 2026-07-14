import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { LucideAngularModule, Shield, Globe, Link2, Code2 } from 'lucide-angular';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, RouterLink, LucideAngularModule],
  templateUrl: './footer.component.html',
})
export class FooterComponent {
  readonly Shield = Shield;
  readonly Globe = Globe;
  readonly Link2 = Link2;
  readonly Code2 = Code2;

  currentYear = new Date().getFullYear();

  product = [
    { name: 'Plataforma', href: '#solution' },
    { name: 'Dashboard',  href: '/dashboard' },

  ];

  company = [
    { name: 'Sobre',     href: '#' },
    { name: 'Contato',   href: '#' },
  ];

legal = [
    { name: 'Privacidade', href: '#privacy' },
    { name: 'Termos',      href: 'https://www.planalto.gov.br/ccivil_03/_ato2015-2018/2018/lei/l13709.htm' },
    { name: 'LGPD',        href: 'https://www.planalto.gov.br/ccivil_03/_ato2015-2018/2018/lei/l13709.htm' },
  ];
}
