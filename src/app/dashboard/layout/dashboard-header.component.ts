import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, Bell, Search, Shield } from 'lucide-angular';

@Component({
  selector: 'app-dashboard-header',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './dashboard-header.component.html',
})
export class DashboardHeaderComponent {
  @Input() title = '';
  @Input() subtitle = '';
  readonly Bell = Bell;
  readonly Search = Search;
  readonly Shield = Shield;
}
