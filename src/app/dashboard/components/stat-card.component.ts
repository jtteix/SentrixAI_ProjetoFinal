import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-stat-card',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  template: `
    <div class="glass rounded-xl p-6 border border-border hover:border-primary/20 transition-all animate-fade-in-up">
      <div class="flex items-start justify-between mb-4">
        <div class="p-3 rounded-xl bg-primary/10" [ngClass]="iconColor">
          <lucide-icon [img]="icon" class="h-5 w-5"></lucide-icon>
        </div>
        <span *ngIf="change" class="text-xs px-2 py-1 rounded-full" [ngClass]="changeClass">
          {{ change }}
        </span>
      </div>
      <p class="text-sm text-muted-foreground mb-1">{{ title }}</p>
      <p class="text-2xl font-bold">{{ value }}</p>
      <p *ngIf="description" class="text-xs text-muted-foreground mt-2">{{ description }}</p>
    </div>
  `,
})
export class StatCardComponent {
  @Input() title = '';
  @Input() value: string | number = '';
  @Input() change = '';
  @Input() changeType: 'positive' | 'negative' | 'neutral' = 'neutral';
  @Input() icon: any;
  @Input() iconColor = 'text-primary';
  @Input() description = '';

  get changeClass(): string {
    const map: Record<string, string> = {
      positive: 'text-success bg-success/10',
      negative: 'text-danger bg-danger/10',
      neutral:  'text-muted-foreground bg-secondary',
    };
    return map[this.changeType] ?? map['neutral'];
  }
}
