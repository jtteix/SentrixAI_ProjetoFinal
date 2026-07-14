import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../shared/components/navbar/navbar.component';
import { FooterComponent } from '../shared/components/footer/footer.component';
import { HeroSectionComponent } from './hero/hero-section.component';
import { ProblemSectionComponent } from './problem/problem-section.component';
import { SolutionSectionComponent } from './solution/solution-section.component';
import { HowItWorksSectionComponent } from './how-it-works/how-it-works-section.component';
import { PrivacySectionComponent } from './privacy/privacy-section.component';
import { FutureSectionComponent } from './future/future-section.component';
import { CtaSectionComponent } from './cta/cta-section.component';
import { DashboardCarouselComponent } from './dashboard-carousel/dashboard-carousel.component';
import { ScrollProgressComponent } from '../shared/components/scroll/scroll-progress.component';
@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [
    CommonModule,
    NavbarComponent,
    FooterComponent,
    HeroSectionComponent,
    ProblemSectionComponent,
    SolutionSectionComponent,
    HowItWorksSectionComponent,
    DashboardCarouselComponent,
    PrivacySectionComponent,
    FutureSectionComponent,
    CtaSectionComponent,
    ScrollProgressComponent, // ← adicionar
  ],
  template: `
    <div class="min-h-screen bg-background text-foreground">
      <app-scroll-progress></app-scroll-progress>  <!-- ← adicionar -->
      <app-navbar></app-navbar>
      <main>
        <app-hero-section></app-hero-section>
        <app-problem-section></app-problem-section>
        <app-solution-section></app-solution-section>
        <app-how-it-works-section></app-how-it-works-section>
        <app-dashboard-carousel></app-dashboard-carousel>
        <app-privacy-section></app-privacy-section>
        <app-future-section></app-future-section>
        <app-cta-section></app-cta-section>
      </main>
      <app-footer></app-footer>
    </div>
  `,
})
export class LandingComponent {}