import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import {
  LucideAngularModule,
  Shield, LayoutDashboard, AlertTriangle, Brain,
  Activity, MapPin, Lock, Eye, Settings, LogOut,
  ChevronLeft, Menu, Car,
} from 'lucide-angular';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-dashboard-sidebar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive, LucideAngularModule],
  templateUrl: './dashboard-sidebar.component.html',
})
export class DashboardSidebarComponent {
  readonly Shield = Shield;
  readonly ChevronLeft = ChevronLeft;
  readonly Menu = Menu;
  readonly LogOut = LogOut;

  isCollapsed = false;
  isMobileOpen = false;

  navItems = [
    { name: 'Dashboard',     href: '/dashboard',              icon: LayoutDashboard },
    { name: 'Ameaças',       href: '/dashboard/threats',      icon: AlertTriangle },
    { name: 'Análise IA',    href: '/dashboard/ai-analysis',  icon: Brain },
    { name: 'Monitoramento', href: '/dashboard/monitoring',   icon: Activity },
    { name: 'Localização',   href: '/dashboard/location',     icon: MapPin },
    { name: 'Simulador',     href: '/dashboard/simulator',    icon: Car },
    { name: 'Modo Seguro',   href: '/dashboard/safe-mode',    icon: Lock },
    { name: 'Privacidade',   href: '/dashboard/privacy',      icon: Eye },
  ];

  bottomItems = [
    { name: 'Configurações', href: '/dashboard/settings', icon: Settings },
  ];

  constructor(private auth: AuthService) {}

  get user() { return this.auth.getUser(); }
  get userInitials(): string {
    const u = this.user;
    if (!u) return 'JD';
    return u.name ? u.name.split(' ').map(w => w[0]).slice(0,2).join('').toUpperCase() : u.email.slice(0,2).toUpperCase();
  }

  toggleCollapse(): void { this.isCollapsed = !this.isCollapsed; }
  toggleMobile(): void { this.isMobileOpen = !this.isMobileOpen; }
  closeMobile(): void { this.isMobileOpen = false; }
  logout(): void { this.auth.logout(); }
}
