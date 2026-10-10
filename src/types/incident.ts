/**
 * CrisisBridge — AI Incident Commander
 * Comprehensive Type Definitions
 * 
 * Compliant with ICS (Incident Command System) and FEMA standards
 * for real-time situational awareness, Google Cloud Services integration,
 * and stateful delta planning.
 */

export type SeverityLevel = 'LEVEL_1_LOW' | 'LEVEL_2_ELEVATED' | 'LEVEL_3_SEVERE' | 'LEVEL_4_CRITICAL';

export type VerticalType = 
  | 'CAMPUS_EVENT'
  | 'HEALTHCARE_SURGE'
  | 'TRANSIT_TERMINAL'
  | 'URBAN_DISASTER'
  | 'HAZMAT_INDUSTRIAL';

export type ActionStatus = 'PENDING' | 'IN_PROGRESS' | 'COMPLETED' | 'BLOCKED';

export type DeltaActionType = 'NEW_URGENT' | 'SUSTAINED' | 'SUPERSEDED' | 'MODIFIED';

export type ActionCategory = 'NOW' | 'NEXT_10_MIN' | 'MONITOR' | 'ESCALATE_WHEN';

export interface ActionItem {
  id: string;
  title: string;
  description: string;
  category: 'NOW' | 'NEXT_10_MIN';
  assignee: string;
  zoneId?: string;
  status: ActionStatus;
  urgency: 'CRITICAL' | 'HIGH' | 'MEDIUM';
  estimatedMinutes: number;
  deltaType?: DeltaActionType;
  deltaReason?: string;
  explainability: {
    rationale: string;
    tradeoffsRejected: string[];
    governingPolicy: string;
    triggerFactor: string;
  };
}

export interface MonitorMetric {
  id: string;
  name: string;
  value: string;
  numericValue: number;
  unit: string;
  status: 'NORMAL' | 'WARNING' | 'CRITICAL';
  trend: 'UP' | 'DOWN' | 'STABLE';
  targetThreshold: string;
  history: number[];
}

export interface EscalateCondition {
  id: string;
  condition: string;
  thresholdValue: string;
  currentObserved: string;
  isTriggered: boolean;
  consequence: string;
  targetRole: string;
}

export interface ZoneNode {
  id: string;
  name: string;
  type: 'GATE' | 'ROUTE' | 'MEDICAL' | 'STAGE' | 'SHELTER' | 'HUB' | 'PERIMETER' | 'HAZARD';
  status: 'CLEAR' | 'CONGESTED' | 'BLOCKED' | 'HAZARD';
  capacityPct: number;
  x: number; // SVG percentage coordinate 0-100
  y: number; // SVG percentage coordinate 0-100
  lat?: number; // Real GPS latitude for Google Maps
  lng?: number; // Real GPS longitude for Google Maps
  connections: string[]; // Connected zone IDs
  unitsDeployed: number;
  hazardNote?: string;
}

export interface StateNode {
  step: 'SITUATION' | 'STATE' | 'DECISION' | 'ACTION' | 'NEW_STATE';
  timestamp: string;
  description: string;
  active: boolean;
}

export interface DeltaReport {
  previousIncidentSummary: string;
  newChaosFactor: string;
  timestamp: string;
  supersededActionIds: string[];
  supersededReasons: Record<string, string>;
  newActionsCount: number;
  sustainedActionsCount: number;
  criticalShiftSummary: string;
}

export interface GeoLocationInfo {
  centerLat: number;
  centerLng: number;
  locationName: string;
  city: string;
  zoomLevel: number;
}

export interface GoogleAISettings {
  apiKey: string;
  model: 'gemini-2.0-flash' | 'gemini-1.5-pro' | 'offline-hybrid';
  isConnected: boolean;
  lastCallLatencyMs?: number;
}

export interface IncidentState {
  id: string;
  codeName: string;
  vertical: VerticalType;
  verticalTitle: string;
  originalSituation: string;
  latestUpdatePrompt?: string;
  severity: SeverityLevel;
  startTime: string;
  operationalPeriod: string;
  incidentCommander: string;
  stateVersion: number;
  stateHash?: string; // SHA-256 cryptographic state signature
  
  // 4 Core Pillars
  nowActions: ActionItem[];
  next10MinActions: ActionItem[];
  monitorMetrics: MonitorMetric[];
  escalateConditions: EscalateCondition[];

  // Spatial & Unit State
  zones: ZoneNode[];
  geoInfo: GeoLocationInfo;
  activeUnitsCount: number;
  totalVolunteers: number;
  activeVolunteers: number;
  
  // State Graph & Audit
  stateGraph: StateNode[];
  deltaReport?: DeltaReport;
  auditTrail: {
    id: string;
    timestamp: string;
    type: 'DISPATCH' | 'STATE_CHANGE' | 'ESCALATION' | 'RESOLUTION' | 'AI_REASONING';
    message: string;
    actor: string;
  }[];
}

export interface TestCaseResult {
  id: string;
  name: string;
  category: 'CODE_QUALITY' | 'SECURITY' | 'EFFICIENCY' | 'STATE_LOGIC' | 'ACCESSIBILITY' | 'GOOGLE_SERVICES';
  status: 'PASS' | 'FAIL';
  executionTimeMs: number;
  details: string;
}
