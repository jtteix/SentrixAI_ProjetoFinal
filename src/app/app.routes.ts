import { Routes } from '@angular/router';
import { authGuard } from './auth/auth.guard';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./landing/landing.component').then(m => m.LandingComponent),
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./auth/auth.component').then(m => m.AuthComponent),
  },
  {
    path: 'dashboard',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./dashboard/dashboard.component').then(m => m.DashboardComponent),
    children: [
      { path: '', loadComponent: () => import('./dashboard/overview/overview.component').then(m => m.OverviewComponent) },
      { path: 'threats', loadComponent: () => import('./dashboard/threats/threats.component').then(m => m.ThreatsComponent) },
      { path: 'ai-analysis', loadComponent: () => import('./dashboard/ai-analysis/ai-analysis.component').then(m => m.AiAnalysisComponent) },
      { path: 'monitoring', loadComponent: () => import('./dashboard/monitoring/monitoring.component').then(m => m.MonitoringComponent) },
      { path: 'location', loadComponent: () => import('./dashboard/location/location.component').then(m => m.LocationComponent) },
      { path: 'simulator', loadComponent: () => import('./dashboard/simulator/simulator.component').then(m => m.SimulatorComponent) },
      { path: 'safe-mode', loadComponent: () => import('./dashboard/safe-mode/safe-mode.component').then(m => m.SafeModeComponent) },
      { path: 'privacy', loadComponent: () => import('./dashboard/privacy/privacy-center.component').then(m => m.PrivacyCenterComponent) },
      { path: 'settings', loadComponent: () => import('./dashboard/settings/settings.component').then(m => m.SettingsComponent) },
    ],
  },
  { path: '**', redirectTo: '' },
];
