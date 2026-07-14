import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { LucideAngularModule, Shield, Menu, X } from 'lucide-angular';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink, LucideAngularModule],
  templateUrl: './navbar.component.html',
})
export class NavbarComponent {
  readonly Shield = Shield;
  readonly Menu = Menu;
  readonly X = X;

  isScrolled = false;
  isMobileMenuOpen = false;

  navLinks = [
    { name: 'Plataforma', href: '#solution' },
    { name: 'Como Funciona', href: '#how-it-works' },
    { name: 'Privacidade', href: '#privacy' },
    { name: 'Dashboard', href: '#dashboard-preview' },
  ];

  @HostListener('window:scroll')
  onScroll(): void {
    this.isScrolled = window.scrollY > 50;
  }

  toggleMobileMenu(): void {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }

  closeMobileMenu(): void {
    this.isMobileMenuOpen = false;
  }
}
