import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, Eye, Shield, Lock, FileText, Download, Trash2 } from 'lucide-angular';
import { DashboardHeaderComponent } from '../layout/dashboard-header.component';

interface PrivacySetting {
  id: string; name: string; description: string; enabled: boolean; category: string;
}

@Component({
  selector: 'app-privacy-center',
  standalone: true,
  imports: [CommonModule, LucideAngularModule, DashboardHeaderComponent],
  templateUrl: './privacy-center.component.html',
})
export class PrivacyCenterComponent {
  readonly Shield = Shield;
  readonly FileText = FileText;
  readonly Lock = Lock;

  rights = [
    { icon: Eye,      title: 'Acessar Dados',  description: 'Veja todos os dados coletados sobre você' },
    { icon: Download, title: 'Exportar Dados', description: 'Baixe uma cópia de seus dados'             },
    { icon: Trash2,   title: 'Excluir Dados',  description: 'Solicite a exclusão de seus dados'         },
  ];

  settings: PrivacySetting[] = [
    { id: '1', name: 'Coleta de Localização',   description: 'Permitir rastreamento GPS para monitoramento de segurança',  enabled: true,  category: 'Localização'       },
    { id: '2', name: 'Histórico de Viagens',    description: 'Armazenar histórico de rotas para análise de padrões',        enabled: true,  category: 'Localização'       },
    { id: '3', name: 'Telemetria do Veículo',   description: 'Coletar dados de performance e diagnóstico',                  enabled: true,  category: 'Dados do Veículo'  },
    { id: '4', name: 'Comportamento de Direção',description: 'Analisar padrões de direção para detecção de anomalias',      enabled: false, category: 'Dados do Veículo'  },
    { id: '5', name: 'Compartilhamento com OEM',description: 'Enviar dados anonimizados para o fabricante',                 enabled: false, category: 'Compartilhamento'  },
    { id: '6', name: 'Melhoria de Produto',     description: 'Usar dados para aprimorar algoritmos de IA',                 enabled: true,  category: 'Compartilhamento'  },
  ];

  summary = [
    { label: 'Dados Coletados',          value: '2.4 GB', detail: 'Últimos 30 dias'       },
    { label: 'Eventos de Localização',   value: '1.247',  detail: 'Este mês'              },
    { label: 'Análises de IA',           value: '458',    detail: 'Processadas localmente' },
    { label: 'Compartilhamentos',        value: '0',      detail: 'Externos'              },
  ];

  get groupedSettings(): Record<string, PrivacySetting[]> {
    return this.settings.reduce((acc, s) => {
      (acc[s.category] = acc[s.category] || []).push(s); return acc;
    }, {} as Record<string, PrivacySetting[]>);
  }

  toggle(id: string): void {
    const s = this.settings.find(x => x.id === id);
    if (s) s.enabled = !s.enabled;
  }

  categories(): string[] { return Object.keys(this.groupedSettings); }
}
