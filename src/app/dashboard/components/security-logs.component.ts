import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, ScrollText, CheckCircle, AlertTriangle, XCircle, Info } from 'lucide-angular';

@Component({
  selector: 'app-security-logs',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './security-logs.component.html',
})
export class SecurityLogsComponent {
  readonly ScrollText = ScrollText;

  logs = [
    { id: '1', timestamp: '14:32:15', type: 'warning', message: 'Tentativa de acesso não autorizado detectada',           source: 'CAN Bus Monitor' },
    { id: '2', timestamp: '14:32:16', type: 'success', message: 'Acesso bloqueado automaticamente pela IA',                source: 'AI Engine' },
    { id: '3', timestamp: '14:28:42', type: 'info',    message: 'Verificação de integridade do GPS concluída',             source: 'GPS Module' },
    { id: '4', timestamp: '14:25:33', type: 'error',   message: 'GPS spoofing attempt blocked - coordenadas falsas rejeitadas', source: 'GPS Integrity' },
    { id: '5', timestamp: '14:20:18', type: 'success', message: 'Modo Seguro desativado - sistema normalizado',            source: 'Safe Mode' },
    { id: '6', timestamp: '14:15:00', type: 'info',    message: 'Scan de rede veicular iniciado',                          source: 'Network Scanner' },
    { id: '7', timestamp: '14:10:45', type: 'success', message: '32 ECUs verificadas - nenhuma anomalia',                  source: 'ECU Monitor' },
    { id: '8', timestamp: '14:05:22', type: 'warning', message: 'Dispositivo Bluetooth desconhecido detectado',            source: 'Bluetooth Monitor' },
  ];

  icon(type: string): any {
    return { success: CheckCircle, warning: AlertTriangle, error: XCircle, info: Info }[type] ?? Info;
  }
  iconColor(type: string): string {
    return { success: 'text-success', warning: 'text-warning', error: 'text-danger', info: 'text-primary' }[type] ?? '';
  }
}
