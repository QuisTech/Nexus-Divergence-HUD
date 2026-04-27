export type ScriptStep =
  | { type: 'cursor'; targetId?: string; x?: number | string; y?: number | string; delay?: number }
  | { type: 'click'; targetId?: string; delay?: number }
  | { type: 'subtitle'; text: string; delay?: number }
  | { type: 'log'; text: string; delay?: number }
  | { type: 'event'; eventType: string; message: string; delay?: number }
  | { type: 'scroll'; targetId?: string; y: number; delay?: number }
  | { type: 'navigate'; url: string; delay?: number }
  | { type: 'wait'; delay: number };

export const SCRIPT: ScriptStep[] = [
    { type: 'log', text: '[System] Nexus Protocol Initiated', delay: 100 },
    { type: 'cursor', x: '50%', y: '50%', delay: 500 },
    { type: 'subtitle', text: 'Welcome to the Nexus Engine. Our mission is to solve the Divergence Dilemma.' },
    { type: 'subtitle', text: 'In today\'s competitive hackathon landscape, a single page isn\'t enough. We built a full production-ready ecosystem.' },
    
    { type: 'scroll', targetId: 'window', y: 800, delay: 1000 },
    { type: 'subtitle', text: 'From powerful landing visuals that demonstrate institutional authority and engineering excellence...' },
    
    { type: 'scroll', targetId: 'window', y: 0, delay: 1000 },
    { type: 'cursor', targetId: 'nav-login', delay: 1200 },
    { type: 'subtitle', text: 'To secure, encrypted authentication flows designed for enterprise-grade institutional security.' },
    
    { type: 'click', targetId: 'nav-login', delay: 400 },
    { type: 'navigate', url: '/auth/login', delay: 1000 },
    { type: 'subtitle', text: 'Our auth gateway utilizes RSA-4096 encryption and multi-node handshakes for total data integrity.' },
    
    { type: 'log', text: '[Security] TLS 1.3 Handshake established', delay: 300 },
    { type: 'cursor', targetId: 'login-btn', delay: 1200 },
    { type: 'subtitle', text: 'Once provisioned, the user is granted access to the core Analytical Hub.' },
    
    { type: 'click', targetId: 'login-btn', delay: 400 },
    { type: 'navigate', url: '/dashboard', delay: 1000 },
    { type: 'subtitle', text: 'The Institutional Risk Desk. Here, we correlate real-time data from Zerve-hosted divergence models.' },
    
    { type: 'log', text: '[Ingestion] Syncing SPY (Alpha Vantage) & Polymarket Data', delay: 300 },
    { type: 'cursor', targetId: 'main-chart-card', delay: 1500 },
    { type: 'subtitle', text: 'Notice the dual-axis convergence chart. We track the S and P 500 index against Polymarket prediction market odds.' },
    
    { type: 'cursor', targetId: 'divergence-card', delay: 1500 },
    { type: 'subtitle', text: 'When sentiment leads price action, Nexus flags a Divergence Alert. This is where high-alpha opportunities are born.' },
    
    { type: 'cursor', targetId: 'nav-trading', delay: 1200 },
    { type: 'subtitle', text: 'For immediate execution, we provided an industry-standard, high-fidelity Trading Terminal.' },
    
    { type: 'click', targetId: 'nav-trading', delay: 400 },
    { type: 'navigate', url: '/dashboard/trading', delay: 1000 },
    { type: 'subtitle', text: 'Equipped with real-time order books, depth charts, and institutional position management panels.' },
    
    { type: 'cursor', targetId: 'nav-settings', delay: 1200 },
    { type: 'subtitle', text: 'Finally, the platform includes full Role-Based Access Control and secure System Audit logging.' },
    
    { type: 'click', targetId: 'nav-settings', delay: 400 },
    { type: 'navigate', url: '/dashboard/settings', delay: 1000 },
    { type: 'subtitle', text: 'Identity management, neural telemetry sync, and encrypted audit trails for full compliance.' },
    
    { type: 'subtitle', text: 'Nexus Engine. Not just a dashboard, but a complete institutional product. Engineered for Victory.' },
    { type: 'cursor', x: '95%', y: '5%', delay: 2000 },
];
