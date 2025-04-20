export interface SecurityPersonnel {
  id: string;
  name: string;
  location: string;
  status: 'active' | 'inactive';
  lastUpdate: Date;
}

export interface CameraData {
  id: string;
  location: string;
  crowdDensity: number;
  movementLevel: number;
  status: 'active' | 'inactive';
  lastUpdate: Date;
  streamUrl: string;
}

export interface Alert {
  id: string;
  timestamp: Date;
  severity: 'low' | 'medium' | 'high';
  type: 'crowd_density' | 'unusual_behavior' | 'rapid_movement' | 'security_breach';
  location: string;
  description: string;
  status: 'new' | 'acknowledged' | 'resolved';
}

export interface CongestionData {
  id: string;
  location: string;
  level: number;
  timestamp: Date;
  status: 'normal' | 'warning' | 'critical';
}

export interface EvacuationRoute {
  id: string;
  name: string;
  status: 'clear' | 'blocked' | 'congested';
  crowdDensity: number;
  lastUpdate: Date;
}