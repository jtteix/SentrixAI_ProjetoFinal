import { Component, HostListener, OnDestroy, OnInit, PLATFORM_ID, inject } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';

interface NavSection {
  id: string;
  label: string;
}

@Component({
  selector: 'app-scroll-progress',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="scroll-progress-bar" [style.transform]="'scaleX(' + progress + ')'"></div>

    <nav class="scroll-hud" aria-label="Navegação de seções">
      <button
        *ngFor="let s of sections"
        type="button"
        class="scroll-hud__dot"
        [class.active]="activeId === s.id"
        (click)="scrollTo(s.id)"
      >
        <span class="scroll-hud__label">{{ s.label }}</span>
      </button>
    </nav>
  `,
})
export class ScrollProgressComponent implements OnInit, OnDestroy {
  private platformId = inject(PLATFORM_ID);
  isBrowser = isPlatformBrowser(this.platformId);

  progress = 0;
  activeId = '';

  sections: NavSection[] = [
    { id: 'hero', label: 'Início' },
    { id: 'problem', label: 'Riscos' },
    { id: 'solution', label: 'Solução' },
    { id: 'how-it-works', label: 'Como Funciona' },
    { id: 'dashboard-preview', label: 'Dashboard' },
    { id: 'privacy', label: 'Privacidade' },
  ];

  private observer?: IntersectionObserver;

  ngOnInit(): void {
    if (this.isBrowser) {
      // Só executa no navegador
      setTimeout(() => this.setupObserver(), 0);
      this.onScroll();
    }
  }

  ngOnDestroy(): void {
    if (this.isBrowser) {
      this.observer?.disconnect();
    }
  }

  @HostListener('window:scroll')
  onScroll(): void {
    if (!this.isBrowser) return;

    const doc = document.documentElement;
    const scrollTop = doc.scrollTop || document.body.scrollTop;
    const scrollHeight = doc.scrollHeight - doc.clientHeight;
    this.progress = scrollHeight > 0 ? Math.min(scrollTop / scrollHeight, 1) : 0;
  }

  private setupObserver(): void {
    if (!this.isBrowser) return;

    const targets = this.sections
      .map((s) => document.getElementById(s.id))
      .filter((el): el is HTMLElement => !!el);

    if (!targets.length || !('IntersectionObserver' in window)) return;

    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            this.activeId = entry.target.id;
          }
        });
      },
      { rootMargin: '-40% 0px -40% 0px', threshold: 0 }
    );

    targets.forEach((t) => this.observer!.observe(t));
  }

  scrollTo(id: string): void {
    if (!this.isBrowser) return;
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}