import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { DashboardSidebarComponent } from './layout/dashboard-sidebar.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterOutlet, DashboardSidebarComponent],
  template: `
    <div class="min-h-screen bg-background">
      <app-dashboard-sidebar></app-dashboard-sidebar>
      <main class="lg:pl-[280px] min-h-screen transition-all duration-300">
        <router-outlet></router-outlet>
      </main>
    </div>
  `,
})
export class DashboardComponent {}
