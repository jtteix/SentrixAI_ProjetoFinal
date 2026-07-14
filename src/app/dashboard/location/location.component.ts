import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, MapPin, Navigation, Shield, AlertTriangle, Clock } from 'lucide-angular';
import { DashboardHeaderComponent } from '../layout/dashboard-header.component';

@Component({
  selector: 'app-location',
  standalone: true,
  imports: [CommonModule, LucideAngularModule, DashboardHeaderComponent],
  templateUrl: './location.component.html',
})
export class LocationComponent {
  readonly Navigation = Navigation;
  readonly Clock = Clock;
  readonly Shield = Shield;

  stats = [
    { icon: MapPin,        label: 'Status GPS',            value: 'Ativo',   color: 'text-success' },
    { icon: Navigation,    label: 'Precisão',              value: '±2.5m',   color: 'text-primary' },
    { icon: Shield,        label: 'Anti-Spoofing',         value: 'Ativo',   color: 'text-success' },
    { icon: AlertTriangle, label: 'Tentativas Bloqueadas', value: '3',       color: 'text-warning' },
  ];

  history = [
    { time: '14:30', location: 'Rua pará, Paripe - Salvador/Ba',      duration: 'Atual'   },
    { time: '12:45', location: 'Iguatemi, Salvador/Ba', duration: '45 min' },
    { time: '11:00', location: 'Av Orlando Gomes, Salvador/Ba',   duration: '1h 15min'},
    { time: '09:30', location: 'Paripe, Salvador/Ba',     duration: '30 min'  },
  ];

  integrity = [
    { label: 'Satélites Visíveis', value: '12',      status: 'Excelente'    },
    { label: 'HDOP',               value: '0.8',     status: 'Alta precisão'},
    { label: 'Última Verificação', value: '< 1 min', status: 'Atualizado'   },
  ];
}
