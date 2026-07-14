export interface RoutePoint {
  x: number;        // SVG coords
  y: number;
  lat: number;      // real GPS
  lng: number;
  label?: string;
  speed: number;    // km/h at this point
  engineTemp: number;
  battery: number;
}

export interface SecurityEvent {
  routeIndex: number;   // which point on route triggers it
  id: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  type: string;
  title: string;
  description: string;
  advice: string;
  requiresSafeMode: boolean;
  autoResolveAfter?: number; // seconds after trigger
}

// Salvador/BA real coordinates mapped to SVG viewport 800x500
// Route: Shopping Barra → Av. Oceânica → Corredor da Vitória →
//        Av. Garibaldi → Av. Vasco da Gama → Av. Paralela → Aeroporto
export const SALVADOR_ROUTE: RoutePoint[] = [
  // Shopping Barra (start)
  { x: 80,  y: 380, lat: -13.0100, lng: -38.5320, label: 'Shopping Barra',         speed: 0,  engineTemp: 78, battery: 100 },
  { x: 110, y: 355, lat: -13.0085, lng: -38.5290, speed: 35, engineTemp: 79, battery: 100 },
  { x: 145, y: 330, lat: -13.0050, lng: -38.5250, label: 'Av. Oceânica',            speed: 50, engineTemp: 80, battery: 99  },
  { x: 180, y: 310, lat: -13.0010, lng: -38.5190, speed: 55, engineTemp: 81, battery: 99  },
  { x: 220, y: 295, lat: -12.9980, lng: -38.5130, label: 'Ondina',                  speed: 60, engineTemp: 82, battery: 98  },
  { x: 260, y: 285, lat: -12.9950, lng: -38.5070, speed: 62, engineTemp: 83, battery: 98  },
  { x: 300, y: 275, lat: -12.9900, lng: -38.5010, label: 'Corredor da Vitória',     speed: 45, engineTemp: 83, battery: 97  },
  { x: 335, y: 265, lat: -12.9860, lng: -38.4960, speed: 40, engineTemp: 84, battery: 97  },
  { x: 370, y: 258, lat: -12.9820, lng: -38.4900, label: 'Federação',               speed: 55, engineTemp: 84, battery: 96  },
  { x: 405, y: 248, lat: -12.9780, lng: -38.4840, speed: 60, engineTemp: 85, battery: 96  },
  { x: 440, y: 238, lat: -12.9730, lng: -38.4780, label: 'Av. Garibaldi',           speed: 65, engineTemp: 85, battery: 95  },
  { x: 475, y: 228, lat: -12.9690, lng: -38.4720, speed: 68, engineTemp: 86, battery: 95  },
  { x: 510, y: 222, lat: -12.9650, lng: -38.4660, label: 'Iguatemi',                speed: 50, engineTemp: 86, battery: 94  },
  { x: 535, y: 215, lat: -12.9610, lng: -38.4610, speed: 55, engineTemp: 87, battery: 94  },
  { x: 560, y: 205, lat: -12.9570, lng: -38.4560, label: 'Av. Vasco da Gama',       speed: 70, engineTemp: 87, battery: 93  },
  { x: 590, y: 195, lat: -12.9520, lng: -38.4500, speed: 75, engineTemp: 88, battery: 93  },
  { x: 615, y: 183, lat: -12.9470, lng: -38.4440, label: 'Av. Paralela (início)',   speed: 80, engineTemp: 88, battery: 92  },
  { x: 640, y: 168, lat: -12.9410, lng: -38.4380, speed: 85, engineTemp: 89, battery: 92  },
  { x: 660, y: 148, lat: -12.9340, lng: -38.4310, label: 'CAB / Paralela',          speed: 90, engineTemp: 90, battery: 91  },
  { x: 672, y: 128, lat: -12.9260, lng: -38.4250, speed: 88, engineTemp: 90, battery: 91  },
  { x: 680, y: 108, lat: -12.9180, lng: -38.4200, label: 'Paralela / Aeroporto',   speed: 75, engineTemp: 89, battery: 90  },
  { x: 685, y: 88,  lat: -12.9110, lng: -38.4155, speed: 60, engineTemp: 89, battery: 90  },
  // Aeroporto (end)
  { x: 688, y: 70,  lat: -12.9050, lng: -38.4120, label: 'Aeroporto de Salvador',  speed: 20, engineTemp: 88, battery: 89  },
];

export const SECURITY_EVENTS: SecurityEvent[] = [
  {
    routeIndex: 4,
    id: 'bt-unknown',
    severity: 'medium',
    type: 'Bluetooth',
    title: 'Dispositivo Bluetooth Desconhecido',
    description: 'Um dispositivo não cadastrado tentou parear com o sistema de entretenimento do veículo.',
    advice: 'Não aceite solicitações de pareamento Bluetooth de dispositivos desconhecidos. Continue dirigindo normalmente.',
    requiresSafeMode: false,
    autoResolveAfter: 8,
  },
  {
    routeIndex: 8,
    id: 'can-intrusion',
    severity: 'high',
    type: 'CAN Bus',
    title: 'Tentativa de Intrusão na Rede Veicular',
    description: 'Mensagens maliciosas foram detectadas no barramento CAN Bus. A IA bloqueou automaticamente os comandos suspeitos.',
    advice: 'Evite parar em locais isolados ou escuros. O sistema está monitorando ativamente.',
    requiresSafeMode: false,
    autoResolveAfter: 12,
  },
  {
    routeIndex: 12,
    id: 'gps-spoof',
    severity: 'high',
    type: 'GPS Spoofing',
    title: 'Ataque de GPS Spoofing Detectado',
    description: 'Coordenadas GPS falsas estão sendo transmitidas para o veículo. O sistema rejeitou as coordenadas inválidas e mantém o GPS real.',
    advice: 'Ignore qualquer redirecionamento incomum do GPS. Siga as placas físicas de trânsito. A IA mantém sua posição real.',
    requiresSafeMode: false,
    autoResolveAfter: 15,
  },
  {
    routeIndex: 17,
    id: 'relay-attack',
    severity: 'critical',
    type: 'Key Relay Attack',
    title: 'AMEAÇA CRÍTICA — Ataque de Relay na Chave',
    description: 'Criminosos estão amplificando o sinal da chave do veículo para tentar assumir o controle remoto. Esta é uma ameaça ao controle veicular.',
    advice: 'ATIVE O MODO SEGURO IMEDIATAMENTE. Dirija para um posto policial ou local movimentado se possível.',
    requiresSafeMode: true,
  },
];
