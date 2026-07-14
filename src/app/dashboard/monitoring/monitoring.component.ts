import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, Activity, Wifi, Gauge } from 'lucide-angular';
import { DashboardHeaderComponent } from '../layout/dashboard-header.component';
import { VehicleStatusComponent } from '../components/vehicle-status.component';
import { SecurityLogsComponent } from '../components/security-logs.component';

@Component({
  selector: 'app-monitoring',
  standalone: true,
  imports: [CommonModule, LucideAngularModule, DashboardHeaderComponent, VehicleStatusComponent, SecurityLogsComponent],
  templateUrl: './monitoring.component.html',
})
export class MonitoringComponent {
  readonly Activity = Activity;
  readonly Wifi = Wifi;
  readonly Gauge = Gauge;

  metrics = [
    { label: 'CPU ECU Principal', value: '23%',     icon: Gauge },
    { label: 'Temperatura',       value: '42°C',    icon: Gauge },
    { label: 'Bateria Sistema',   value: '98%',     icon: Gauge },
    { label: 'Sinal Celular',     value: '-67 dBm', icon: Gauge },
  ];

  canBuses = [
    { id: 'CAN-H',   packets: 1247 },
    { id: 'CAN-L',   packets: 1243 },
    { id: 'LIN',     packets: 89   },
    { id: 'FlexRay', packets: 456  },
  ];

  connections = [
    { id: 'Celular 5G', inbound: '2.3 MB/s',  outbound: '156 KB/s' },
    { id: 'Wi-Fi',      inbound: '0 KB/s',    outbound: '0 KB/s'   },
    { id: 'Bluetooth',  inbound: '12 KB/s',   outbound: '8 KB/s'   },
    { id: 'V2X',        inbound: '45 KB/s',   outbound: '32 KB/s'  },
  ];
}
