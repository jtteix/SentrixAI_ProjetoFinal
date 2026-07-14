import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-security-score',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="flex flex-col items-center">
      <div class="relative" [ngClass]="sizeClass">
        <svg class="w-full h-full -rotate-90" viewBox="0 0 120 120">
          <circle cx="60" cy="60" r="54" fill="none" stroke="currentColor"
                  stroke-width="8" class="text-secondary"/>
          <circle cx="60" cy="60" r="54" fill="none" stroke="currentColor"
                  stroke-width="8" stroke-linecap="round"
                  [ngClass]="scoreColor"
                  [attr.stroke-dasharray]="circumference"
                  [attr.stroke-dashoffset]="dashOffset"
                  style="transition: stroke-dashoffset 1.5s ease-out"/>
        </svg>
        <div class="absolute inset-0 flex flex-col items-center justify-center">
          <span class="font-bold" [ngClass]="[scoreColor, textSize]">{{ score }}</span>
          <span class="text-xs text-muted-foreground">/{{ maxScore }}</span>
        </div>
      </div>
      <div class="flex items-center gap-2 mt-3">
        <div class="w-2 h-2 rounded-full animate-pulse" [ngClass]="dotColor"></div>
        <span class="font-medium" [ngClass]="[labelSize, scoreColor]">{{ scoreLabel }}</span>
      </div>
    </div>
  `,
})
export class SecurityScoreComponent {
  @Input() score = 94;
  @Input() maxScore = 100;
  @Input() size: 'sm' | 'md' | 'lg' = 'md';

  get percentage(): number { return (this.score / this.maxScore) * 100; }
  get circumference(): number { return 2 * Math.PI * 54; }
  get dashOffset(): number { return this.circumference - (this.percentage / 100) * this.circumference; }

  get scoreColor(): string {
    if (this.percentage >= 80) return 'text-success';
    if (this.percentage >= 60) return 'text-warning';
    return 'text-danger';
  }

  get dotColor(): string { return this.scoreColor.replace('text-', 'bg-'); }

  get scoreLabel(): string {
    if (this.percentage >= 80) return 'Protegido';
    if (this.percentage >= 60) return 'Atenção';
    return 'Em Risco';
  }

  get sizeClass(): string {
    return { sm: 'w-24 h-24', md: 'w-32 h-32', lg: 'w-40 h-40' }[this.size];
  }

  get textSize(): string {
    return { sm: 'text-2xl', md: 'text-3xl', lg: 'text-4xl' }[this.size];
  }

  get labelSize(): string {
    return { sm: 'text-xs', md: 'text-xs', lg: 'text-sm' }[this.size];
  }
}
