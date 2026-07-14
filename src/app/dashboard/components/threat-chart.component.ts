import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-threat-chart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './threat-chart.component.html',
})
export class ThreatChartComponent implements OnInit {
  @Input() type: 'threats' | 'score' = 'threats';

  threatData = [
    { label: '00h', threats: 12, blocked: 12 },
    { label: '04h', threats: 8,  blocked: 8  },
    { label: '08h', threats: 23, blocked: 22 },
    { label: '12h', threats: 45, blocked: 44 },
    { label: '16h', threats: 32, blocked: 31 },
    { label: '20h', threats: 18, blocked: 18 },
    { label: '24h', threats: 15, blocked: 15 },
  ];

  weeklyData = [
    { label: 'Seg', score: 92 },
    { label: 'Ter', score: 88 },
    { label: 'Qua', score: 95 },
    { label: 'Qui', score: 91 },
    { label: 'Sex', score: 94 },
    { label: 'Sáb', score: 96 },
    { label: 'Dom', score: 94 },
  ];

  W = 380; H = 160;
  pad = { top: 10, right: 10, bottom: 28, left: 28 };

  get chartW(): number { return this.W - this.pad.left - this.pad.right; }
  get chartH(): number { return this.H - this.pad.top - this.pad.bottom; }

  /* ---- score chart ---- */
  get scoreMax(): number { return 100; }
  get scoreMin(): number { return 80; }

  scoreX(i: number): number {
    return this.pad.left + (i / (this.weeklyData.length - 1)) * this.chartW;
  }
  scoreY(v: number): number {
    return this.pad.top + (1 - (v - this.scoreMin) / (this.scoreMax - this.scoreMin)) * this.chartH;
  }
  get scorePath(): string {
    return this.weeklyData.map((d, i) => `${i === 0 ? 'M' : 'L'}${this.scoreX(i)},${this.scoreY(d.score)}`).join(' ');
  }
  get scoreArea(): string {
    const base = `${this.scoreX(0)},${this.pad.top + this.chartH} `;
    const pts = this.weeklyData.map((d, i) => `${this.scoreX(i)},${this.scoreY(d.score)}`).join(' ');
    const end = ` ${this.scoreX(this.weeklyData.length - 1)},${this.pad.top + this.chartH}`;
    return `M${base}${pts}${end}Z`;
  }

  /* ---- threat chart ---- */
  get threatMax(): number { return 50; }
  threatX(i: number): number {
    return this.pad.left + (i / (this.threatData.length - 1)) * this.chartW;
  }
  threatY(v: number): number {
    return this.pad.top + (1 - v / this.threatMax) * this.chartH;
  }
  pathFor(key: 'threats' | 'blocked'): string {
    return this.threatData.map((d, i) => `${i === 0 ? 'M' : 'L'}${this.threatX(i)},${this.threatY(d[key])}`).join(' ');
  }

  ngOnInit(): void {}
}
