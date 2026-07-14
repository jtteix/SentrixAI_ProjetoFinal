import {
  Directive,
  ElementRef,
  Input,
  OnInit,
  OnDestroy,
  Renderer2,
  inject,
} from '@angular/core';

export type RevealVariant =
  | 'fade-up'
  | 'fade-down'
  | 'fade-left'
  | 'fade-right'
  | 'scale'
  | 'cyber-scan'
  | 'stagger';

/**
 * Diretiva de scroll reveal baseada em IntersectionObserver.
 *
 * Uso básico:
 *   <div appScrollReveal>...</div>                     -> fade-up (default)
 *   <div appScrollReveal="cyber-scan">...</div>          -> efeito HUD de scan
 *   <div appScrollReveal="stagger">                      -> anima os filhos em cascata
 *     <div class="card" *ngFor="let x of items">...</div>
 *   </div>
 *
 * Parâmetros opcionais:
 *   [revealDelay]="150"        -> delay em ms antes de iniciar
 *   [revealThreshold]="0.2"    -> % do elemento visível para disparar (0-1)
 *   [revealOnce]="false"       -> se true (default), anima só na primeira vez
 *   [staggerStep]="100"        -> delay entre filhos quando variant = 'stagger'
 */
@Directive({
  selector: '[appScrollReveal]',
  standalone: true,
})
export class ScrollRevealDirective implements OnInit, OnDestroy {
  @Input('appScrollReveal') variant: RevealVariant | '' = 'fade-up';
  @Input() revealDelay = 0;
  @Input() revealThreshold = 0.15;
  @Input() revealOnce = true;
  @Input() revealRootMargin = '0px 0px -10% 0px';
  @Input() staggerStep = 90;
  @Input() staggerSelector = ':scope > *';

  private el = inject(ElementRef<HTMLElement>);
  private renderer = inject(Renderer2);
  private observer?: IntersectionObserver;

  ngOnInit(): void {
    const host = this.el.nativeElement;
    const variant = this.variant || 'fade-up';

    this.renderer.addClass(host, 'scroll-reveal');
    this.renderer.addClass(host, `scroll-reveal--${variant}`);

    if (this.revealDelay) {
      this.renderer.setStyle(host, '--reveal-delay', `${this.revealDelay}ms`);
    }

    if (variant === 'stagger') {
      const children = Array.from(
        host.querySelectorAll(this.staggerSelector)
      ) as HTMLElement[];
      children.forEach((child, i) => {
        this.renderer.addClass(child, 'scroll-reveal__stagger-item');
        this.renderer.setStyle(
          child,
          '--stagger-delay',
          `${i * this.staggerStep}ms`
        );
      });
    }

    if (typeof window === 'undefined' || !('IntersectionObserver' in window)) {
      // SSR ou navegador sem suporte: mostra tudo direto
      this.renderer.addClass(host, 'is-visible');
      return;
    }

    this.observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            this.renderer.addClass(host, 'is-visible');
            if (this.revealOnce) {
              this.observer?.unobserve(host);
            }
          } else if (!this.revealOnce) {
            this.renderer.removeClass(host, 'is-visible');
          }
        }
      },
      { threshold: this.revealThreshold, rootMargin: this.revealRootMargin }
    );

    this.observer.observe(host);
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }
}
