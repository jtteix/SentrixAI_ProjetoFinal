import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, User, Bell, Shield, Palette, Globe, Key, Smartphone } from 'lucide-angular';
import { DashboardHeaderComponent } from '../layout/dashboard-header.component';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [CommonModule, LucideAngularModule, DashboardHeaderComponent],
  templateUrl: './settings.component.html',
})
export class SettingsComponent implements OnInit {
  readonly User = User;
  readonly Bell = Bell;
  readonly Shield = Shield;
  readonly Palette = Palette;
  readonly Globe = Globe;
  readonly Key = Key;
  readonly Smartphone = Smartphone;

  user = {
    name: 'Usuário',
    email: '',
    initials: 'U'
  };

  notifications = [
    { label: 'Alertas Críticos',        enabled: true  },
    { label: 'Relatórios Diários',     enabled: true  },
    { label: 'Atualizações de Sistema', enabled: false },
    { label: 'Newsletter',             enabled: false },
  ];

  themes = [
    { name: 'Escuro',  active: false },
    { name: 'Claro',   active: false },
  ];

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    // 1. Inicializa o estado dos botões baseado no tema salvo
    const savedTheme = localStorage.getItem('theme') || 'sistema';
    const themeIndex = this.themes.findIndex(t => t.name.toLowerCase() === savedTheme);
    if (themeIndex !== -1) {
      this.themes[themeIndex].active = true;
    } else {
      this.themes[2].active = true; // Fallback para sistema caso dê erro
    }

    // 2. Busca os dados do usuário através do AuthService
    const currentUser = this.authService.getUser ? this.authService.getUser() : null;
    const savedUser = currentUser || JSON.parse(localStorage.getItem('user') || localStorage.getItem('userData') || '{}');

    if (savedUser && (savedUser.name || savedUser.nome || savedUser.email)) {
      this.user.name = savedUser.name || savedUser.nome || 'Usuário';
      this.user.email = savedUser.email || '';
      
      if (this.user.name && this.user.name !== 'Usuário') {
        const names = this.user.name.trim().split(/\s+/);
        this.user.initials = names.length > 1 
          ? (names[0][0] + names[names.length - 1][0]).toUpperCase() 
          : names[0][0].toUpperCase();
      }
    }
  }

  toggleNotification(index: number): void {
    this.notifications[index].enabled = !this.notifications[index].enabled;
  }

  selectTheme(index: number): void {
    // Atualiza o estado visual ativo dos botões
    this.themes.forEach((t, i) => t.active = i === index);
    
    // Dispara a lógica de aplicação real do tema
    const themeName = this.themes[index].name.toLowerCase();
    this.applyTheme(themeName);
  }

  private applyTheme(theme: string): void {
    const root = document.documentElement;
    localStorage.setItem('theme', theme);

    if (theme === 'escuro') {
      root.classList.add('dark');
    } else if (theme === 'claro') {
      root.classList.remove('dark');
    } else if (theme === 'sistema') {
      const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      if (systemPrefersDark) {
        root.classList.add('dark');
      } else {
        root.classList.remove('dark');
      }
    }
  }
}