# Scroll Reveal — SENTRIX AI

3 arquivos novos:

- `scroll-reveal.directive.ts` → diretiva `appScrollReveal`
- `scroll-reveal.css` → estilos/keyframes (inclua no `styles.css` global)
- `scroll-progress.component.ts` → barra de progresso + HUD lateral de navegação

## 1. Instalação

1. Copie os 3 arquivos para o projeto (ex: `src/app/shared/scroll/`).
2. No `styles.css` global, adicione:
   ```css
   @import './app/shared/scroll/scroll-reveal.css';
   ```
3. No `landing.component.ts`, importe o `ScrollRevealDirective` (nos componentes de seção que forem usá-la) e o `ScrollProgressComponent`:

```ts
import { ScrollProgressComponent } from '../shared/scroll/scroll-progress.component';

@Component({
  ...
  imports: [
    // ...existentes,
    ScrollProgressComponent,
  ],
  template: `
    <div class="min-h-screen bg-background text-foreground">
      <app-scroll-progress></app-scroll-progress>
      <app-navbar></app-navbar>
      <main>
        <app-hero-section></app-hero-section>
        ...
      </main>
      <app-footer></app-footer>
    </div>
  `,
})
export class LandingComponent {}
```

> A `ScrollProgressComponent` procura elementos com os ids: `hero`, `problem`,
> `solution`, `how-it-works`, `dashboard-preview`, `privacy`. Adicione
> `id="hero"` na tag `<section>` do `hero-section.component.html` (as demais
> seções já têm id).

## 2. Onde aplicar cada variante

A diretiva é standalone — importe `ScrollRevealDirective` no array `imports`
de cada componente de seção que for usá-la.

### Hero — `cyber-scan`
Efeito de "boot up" do sistema, combina bem com o headline principal.
```html
<section id="hero" appScrollReveal="cyber-scan" class="relative min-h-screen ...">
```
Como o hero já está visível ao carregar a página, ou remova a diretiva dele
(deixe só as animações `animate-fade-in-up` que já existem), ou use
`[revealThreshold]="0"` com `[revealRootMargin]="'0px'"` pra disparar assim
que o layout monta.

### Problem — título em `fade-up`, stats e timeline em `stagger`
```html
<div appScrollReveal="fade-up" class="... text-center mb-16">
  <!-- badge + h2 + p -->
</div>

<div appScrollReveal="stagger" class="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
  <div *ngFor="let stat of stats" class="glass rounded-xl p-6 text-center">...</div>
</div>

<div appScrollReveal="stagger" [staggerStep]="120" class="relative">
  <div *ngFor="let threat of threats; let i = index" ...>...</div>
</div>
```

### Solution — cards do grid em `stagger`, cada card também pode usar `scale`
```html
<div appScrollReveal="stagger" class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
  <div *ngFor="let feature of features" class="glass rounded-2xl p-6 ...">...</div>
</div>
```

### How it works — os 6 passos em `stagger` (cascata acompanhando a leitura em grid)
```html
<div appScrollReveal="stagger" [staggerStep]="100" class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
  <div *ngFor="let step of steps; let i = index" class="relative">...</div>
</div>
```

### Dashboard carousel — `cyber-scan` no browser mock
Reforça a estética "tela ligando" bem alinhada ao tema de cibersegurança.
```html
<div appScrollReveal="cyber-scan" class="rounded-2xl border border-border overflow-hidden shadow-2xl animated-border">
```

### Privacy — coluna esquerda `fade-right`, coluna direita `fade-left`, cards `stagger`
```html
<div appScrollReveal="fade-right">
  <!-- texto + badge -->
  <div appScrollReveal="stagger" class="grid sm:grid-cols-2 gap-4">
    <div *ngFor="let feature of privacyFeatures" ...>...</div>
  </div>
</div>

<div appScrollReveal="fade-left">
  <!-- card de conformidade -->
</div>
```

### Future — cards em `stagger`, quote final em `fade-up` com delay
```html
<div appScrollReveal="stagger" class="grid md:grid-cols-3 gap-8">
  <div *ngFor="let card of cards" class="relative group">...</div>
</div>

<div appScrollReveal="fade-up" [revealDelay]="150" class="mt-20 text-center">
  <blockquote>...</blockquote>
</div>
```

### CTA — `scale` no bloco central
```html
<div appScrollReveal="scale" class="relative z-10 max-w-4xl mx-auto px-6 text-center">
```

## 3. Parâmetros úteis

| Input | Default | Descrição |
|---|---|---|
| `appScrollReveal` | `'fade-up'` | variante: `fade-up`, `fade-down`, `fade-left`, `fade-right`, `scale`, `cyber-scan`, `stagger` |
| `revealDelay` | `0` | delay em ms antes de animar |
| `revealThreshold` | `0.15` | % visível do elemento pra disparar (0–1) |
| `revealOnce` | `true` | se `false`, reanima toda vez que entra/sai da viewport |
| `revealRootMargin` | `'0px 0px -10% 0px'` | ajusta quando o observer considera "visível" |
| `staggerStep` | `90` | delay entre filhos (só variant `stagger`) |
| `staggerSelector` | `':scope > *'` | seletor dos filhos animados no `stagger` |

## 4. Notas de performance

- O `IntersectionObserver` é muito mais barato que listeners de `scroll` —
  não há recalculo de layout a cada frame.
- Por padrão `revealOnce = true`, então cada elemento é observado uma única
  vez e depois desconectado (`unobserve`), zero overhead depois disso.
- O efeito `cyber-scan` usa `clip-path` (compositor-friendly) em vez de
  `height`/`width`, então não força reflow.
- `prefers-reduced-motion` já está tratado no CSS: quem tem essa preferência
  no SO vê só um fade simples, sem transforms/clip-path/animations.
