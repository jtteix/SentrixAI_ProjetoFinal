import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, AlertTriangle, Shield, CheckCircle, XCircle } from 'lucide-angular';

export interface ThreatAlert {
  id: string;
  type: string;
  message: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  timestamp: string;
  status: 'active' | 'blocked' | 'resolved';
}

@Component({
  selector: 'app-threat-list',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './threat-list.component.html',
})
export class ThreatListComponent {
  @Input() threats: ThreatAlert[] = [];
  @Input() showStatus = true;

  readonly AlertTriangle = AlertTriangle;
  readonly Shield = Shield;
  readonly CheckCircle = CheckCircle;
  readonly XCircle = XCircle;

  severityLabels: Record<string, string> = {
    critical: 'Crítico', high: 'Alto', medium: 'Médio', low: 'Baixo',
  };

  bgClass(s: string): string {
    const m: Record<string, string> = { critical: 'bg-danger/10', high: 'bg-danger/5', medium: 'bg-warning/10', low: 'bg-primary/5' };
    return m[s] ?? '';
  }
  borderClass(s: string): string {
    const m: Record<string, string> = { critical: 'border-danger/30', high: 'border-danger/20', medium: 'border-warning/30', low: 'border-primary/20' };
    return m[s] ?? '';
  }
  iconClass(s: string): string {
    const m: Record<string, string> = { critical: 'text-danger', high: 'text-danger', medium: 'text-warning', low: 'text-primary' };
    return m[s] ?? '';
  }
  badgeClass(s: string): string {
    const m: Record<string, string> = { critical: 'bg-danger/20 text-danger', high: 'bg-danger/10 text-danger', medium: 'bg-warning/20 text-warning', low: 'bg-primary/10 text-primary' };
    return m[s] ?? '';
  }
  statusIcon(status: string): any {
    return status === 'blocked' ? Shield : status === 'resolved' ? CheckCircle : XCircle;
  }
  statusIconClass(status: string): string {
    return status === 'active' ? 'text-danger' : 'text-success';
  }
}
