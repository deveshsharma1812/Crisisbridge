/**
 * CrisisBridge Default Scenarios & Vertical Presets
 * Pre-engineered incident scenarios demonstrating domain-specific
 * state models, initial chaos inputs, and failure injection triggers.
 */

import type { IncidentState, VerticalType } from '../types/incident';

export interface ScenarioPreset {
  id: string;
  vertical: VerticalType;
  title: string;
  tagline: string;
  initialChaosText: string;
  chaosInjectionQuickPicks: {
    label: string;
    text: string;
    description: string;
  }[];
  initialState: IncidentState;
}

export const PRESET_SCENARIOS: Record<VerticalType, ScenarioPreset> = {
  CAMPUS_EVENT: {
    id: 'campus-fest-01',
    vertical: 'CAMPUS_EVENT',
    title: 'Campus Fest Choke Point Crisis',
    tagline: 'Annual college cultural fest crowd surge with rain and transit block',
    initialChaosText: 'Our college event starts in 30 minutes. Gate 2 is crowded, one volunteer is missing, the ambulance route is blocked and rain has started.',
    chaosInjectionQuickPicks: [
      {
        label: '🚨 Gate 3 Blocked (Prompt Scenario)',
        text: 'Gate 3 is now blocked by falling scaffolding and electrical cables.',
        description: 'Invalidates Gate 3 alternate diversion; forces immediate perimeter rerouting.'
      },
      {
        label: '⚡ Main Stage Power Grid Trip',
        text: 'Main stage audio console and floodlights just tripped into total blackout.',
        description: 'Sudden disorientation risk in center quad.'
      },
      {
        label: '🚑 Medic Dispatched to South Lawn',
        text: 'Student collapsed near Food Court Alpha due to dehydration in crowd surge.',
        description: 'Ties up emergency response team.'
      },
      {
        label: '🌧️ Heavy Torrential Downpour',
        text: 'Light rain turned into heavy torrential downpour with gusty winds.',
        description: 'Escalates slip hazards and pushes crowds to indoor lobbies.'
      }
    ],
    initialState: {
      id: 'INC-2026-FEST',
      codeName: 'OPERATION SHIELDGATE',
      vertical: 'CAMPUS_EVENT',
      verticalTitle: 'Campus Operations & Mass Gathering',
      originalSituation: 'Our college event starts in 30 minutes. Gate 2 is crowded, one volunteer is missing, the ambulance route is blocked and rain has started.',
      severity: 'LEVEL_3_SEVERE',
      startTime: 'T-30 mins to Doors Open',
      operationalPeriod: '15:30 - 16:30 IST',
      incidentCommander: 'AI Incident Commander (Bridge-Alpha)',
      stateVersion: 1,
      activeUnitsCount: 14,
      totalVolunteers: 18,
      activeVolunteers: 17,
      
      nowActions: [
        {
          id: 'ACT-NOW-1',
          title: 'Redirect people from Gate 2',
          description: 'Deploy 4 marshals with megaphones to funnel 50% of the arriving crowd to North Corridor Gate 1 and South Gate 3.',
          category: 'NOW',
          assignee: 'Marshal Alpha Team (Lead: Rahul V.)',
          zoneId: 'ZONE_GATE2',
          status: 'IN_PROGRESS',
          urgency: 'CRITICAL',
          estimatedMinutes: 2,
          explainability: {
            triggerFactor: 'Gate 2 approaching 92% crowd capacity limit with continuous arrival surge.',
            governingPolicy: 'Life Safety Directive §4.2 (Choke Point Dispersion)',
            rationale: 'Active bottleneck prevention before stampede threshold is breached.',
            tradeoffsRejected: ['Complete Gate 2 closure (would trigger panic crush at barriers)']
          }
        },
        {
          id: 'ACT-NOW-2',
          title: 'Contact backup volunteer',
          description: 'Activate Standby Reserve Unit #2 (Phone dispatch + walkie channel 4) to substitute missing volunteer at North Checkpoint.',
          category: 'NOW',
          assignee: 'Volunteer Dispatch Ops',
          zoneId: 'ZONE_STAGE',
          status: 'PENDING',
          urgency: 'HIGH',
          estimatedMinutes: 1,
          explainability: {
            triggerFactor: 'One volunteer unaccounted for at critical ID validation perimeter.',
            governingPolicy: 'Event Staffing Minimum Ratios (1 Marshal per 60 Attendees)',
            rationale: 'North Checkpoint check flow degrades without second staffer, backing up crowd onto pedestrian roads.',
            tradeoffsRejected: ['Pulling marshal from ambulance lane (would compromise emergency corridor)']
          }
        },
        {
          id: 'ACT-NOW-3',
          title: 'Keep emergency lane clear',
          description: 'Dispatch 2 security officers to tow/move illegally parked sponsor delivery truck blocking the ambulance access lane.',
          category: 'NOW',
          assignee: 'Security Unit Delta',
          zoneId: 'ZONE_EMERGENCY_ROUTE',
          status: 'IN_PROGRESS',
          urgency: 'CRITICAL',
          estimatedMinutes: 3,
          explainability: {
            triggerFactor: 'Obstruction identified on designated medical evacuation arterial.',
            governingPolicy: 'ICS Emergency Egress Clearance Standard (0-minute tolerance)',
            rationale: 'In case of medical emergency, ambulance turnaround time would exceed survivability window.',
            tradeoffsRejected: ['Rerouting ambulance through public lawn (surface is muddy from rain)']
          }
        }
      ],

      next10MinActions: [
        {
          id: 'ACT-NEXT-1',
          title: 'Open alternate route',
          description: 'Unlock secondary gates at Pavilion East (Gate 3) and install directional luminescent signage to split entry stream.',
          category: 'NEXT_10_MIN',
          assignee: 'Logistics Lead (Priya M.)',
          zoneId: 'ZONE_GATE3',
          status: 'PENDING',
          urgency: 'HIGH',
          estimatedMinutes: 7,
          explainability: {
            triggerFactor: 'Rain forcing crowd inward towards covered canopy sectors.',
            governingPolicy: 'Dynamic Ingress Balancing Protocol',
            rationale: 'Splits arrival load into two distinct wings, reducing Gate 2 pressure by 40%.',
            tradeoffsRejected: ['Delaying opening time (would double external crowd density in rain)']
          }
        },
        {
          id: 'ACT-NEXT-2',
          title: 'Notify campus security',
          description: 'Send high-priority priority dispatch to Campus Chief Security Officer and request police liaison at outer roadway junction.',
          category: 'NEXT_10_MIN',
          assignee: 'Command Dispatch Liaison',
          zoneId: 'ZONE_PERIMETER',
          status: 'PENDING',
          urgency: 'MEDIUM',
          estimatedMinutes: 5,
          explainability: {
            triggerFactor: 'Traffic backing up at campus main exterior entrance.',
            governingPolicy: 'Inter-Agency Escalation SOP',
            rationale: 'Prevents vehicular deadlock from blocking responding city first-responders.',
            tradeoffsRejected: ['Relying solely on student traffic volunteers']
          }
        },
        {
          id: 'ACT-NEXT-3',
          title: 'Recalculate crowd allocation',
          description: 'Rebalance capacity limits across Main Stage covered arena vs Open Lawn due to incoming precipitation.',
          category: 'NEXT_10_MIN',
          assignee: 'Safety Analytics Engine',
          zoneId: 'ZONE_STAGE',
          status: 'PENDING',
          urgency: 'MEDIUM',
          estimatedMinutes: 6,
          explainability: {
            triggerFactor: 'Rain renders open-air lawn unusable; crowd will compress under arena roof.',
            governingPolicy: 'Sheltered Footprint Density Rule (max 3 persons/m²)',
            rationale: 'Proactively caps arena ticket scanning to avoid crush at indoor doors.',
            tradeoffsRejected: ['Allowing unrestricted indoor rush']
          }
        }
      ],

      monitorMetrics: [
        {
          id: 'METRIC-1',
          name: 'Gate 2 Crowd Density',
          value: '88% (High)',
          numericValue: 88,
          unit: '%',
          status: 'WARNING',
          trend: 'UP',
          targetThreshold: '< 75%',
          history: [55, 64, 72, 81, 88]
        },
        {
          id: 'METRIC-2',
          name: 'Precipitation Rate',
          value: '4.2 mm/h (Rain)',
          numericValue: 4.2,
          unit: 'mm/h',
          status: 'WARNING',
          trend: 'UP',
          targetThreshold: '< 2.0 mm/h',
          history: [0, 0.5, 1.8, 3.1, 4.2]
        },
        {
          id: 'METRIC-3',
          name: 'Emergency Access Clearance',
          value: '40% (Partial Obstruction)',
          numericValue: 40,
          unit: '%',
          status: 'CRITICAL',
          trend: 'DOWN',
          targetThreshold: '100% Clear',
          history: [100, 90, 75, 50, 40]
        },
        {
          id: 'METRIC-4',
          name: 'Staff Deployment Ratio',
          value: '94% (17/18)',
          numericValue: 94,
          unit: '%',
          status: 'NORMAL',
          trend: 'STABLE',
          targetThreshold: '>= 90%',
          history: [100, 100, 100, 94, 94]
        }
      ],

      escalateConditions: [
        {
          id: 'ESC-1',
          condition: 'Gate 2 crowd density > 90% for > 3 minutes',
          thresholdValue: '90%',
          currentObserved: '88% (Approaching)',
          isTriggered: false,
          consequence: 'Trigger mandatory hard metering: hold exterior line at turnstiles.',
          targetRole: 'Head of Security'
        },
        {
          id: 'ESC-2',
          condition: 'Ambulance route blocked > 5 minutes',
          thresholdValue: 'Blocked > 5m',
          currentObserved: 'Obstructed 3m 20s',
          isTriggered: false,
          consequence: 'Authorize emergency tow and activate secondary medical evacuation route via Faculty Gate.',
          targetRole: 'Logistics Incident Lead'
        },
        {
          id: 'ESC-3',
          condition: 'Staff availability < minimum threshold (15 active marshals)',
          thresholdValue: '< 15 marshals',
          currentObserved: '17 active (Safe margin: +2)',
          isTriggered: false,
          consequence: 'Request immediate student union senior reserve pool activation.',
          targetRole: 'Volunteer Coordinator'
        },
        {
          id: 'ESC-4',
          condition: 'Rainfall exceeds 8.0 mm/h or lightning detected within 5km',
          thresholdValue: '> 8.0 mm/h',
          currentObserved: '4.2 mm/h',
          isTriggered: false,
          consequence: 'Cease outdoor staging operations; enforce indoor shelter protocol.',
          targetRole: 'Safety Director'
        }
      ],

      zones: [
        {
          id: 'ZONE_GATE1',
          name: 'Gate 1 (North Main)',
          type: 'GATE',
          status: 'CLEAR',
          capacityPct: 35,
          x: 20,
          y: 20,
          connections: ['ZONE_STAGE', 'ZONE_EMERGENCY_ROUTE'],
          unitsDeployed: 4
        },
        {
          id: 'ZONE_GATE2',
          name: 'Gate 2 (Transit Choke)',
          type: 'GATE',
          status: 'CONGESTED',
          capacityPct: 88,
          x: 20,
          y: 65,
          connections: ['ZONE_EMERGENCY_ROUTE', 'ZONE_STAGE'],
          unitsDeployed: 5,
          hazardNote: 'Crowd surge & queue spillover into parking access'
        },
        {
          id: 'ZONE_GATE3',
          name: 'Gate 3 (South Pavilion)',
          type: 'GATE',
          status: 'CLEAR',
          capacityPct: 15,
          x: 78,
          y: 75,
          connections: ['ZONE_STAGE'],
          unitsDeployed: 2
        },
        {
          id: 'ZONE_EMERGENCY_ROUTE',
          name: 'Ambulance Arterial Corridor',
          type: 'ROUTE',
          status: 'BLOCKED',
          capacityPct: 95,
          x: 48,
          y: 40,
          connections: ['ZONE_GATE1', 'ZONE_GATE2', 'ZONE_MEDIC'],
          unitsDeployed: 2,
          hazardNote: 'Delivery van blocking outbound turning radius'
        },
        {
          id: 'ZONE_STAGE',
          name: 'Central Arena & Main Stage',
          type: 'STAGE',
          status: 'CLEAR',
          capacityPct: 45,
          x: 50,
          y: 70,
          connections: ['ZONE_GATE1', 'ZONE_GATE2', 'ZONE_GATE3', 'ZONE_MEDIC'],
          unitsDeployed: 3
        },
        {
          id: 'ZONE_MEDIC',
          name: 'Medical Aid Tent & Triage',
          type: 'MEDICAL',
          status: 'CLEAR',
          capacityPct: 20,
          x: 80,
          y: 25,
          connections: ['ZONE_EMERGENCY_ROUTE', 'ZONE_STAGE'],
          unitsDeployed: 2
        }
      ],

      stateGraph: [
        { step: 'SITUATION', timestamp: '15:00:00', description: 'User reported multi-point chaos at Gate 2, missing volunteer, rain, and blocked lane.', active: false },
        { step: 'STATE', timestamp: '15:00:02', description: 'Parsed into 6 spatial sectors, 4 metrics, threat level: LEVEL 3 SEVERE.', active: false },
        { step: 'DECISION', timestamp: '15:00:04', description: 'Formulated 3 immediate actions (NOW), 3 stabilization directives (NEXT 10M), 4 thresholds.', active: false },
        { step: 'ACTION', timestamp: '15:00:06', description: 'Dispatched units to Gate 2 diversion, standby volunteer alert, and emergency lane tow.', active: true },
        { step: 'NEW_STATE', timestamp: '15:00:10', description: 'Ready for real-time telemetry updates or Situation Changed injection.', active: false }
      ],

      auditTrail: [
        { id: 'LOG-1', timestamp: '15:00:01', type: 'STATE_CHANGE', message: 'Initial chaotic input converted to ICS Action Matrix.', actor: 'AI Incident Commander' },
        { id: 'LOG-2', timestamp: '15:00:03', type: 'DISPATCH', message: 'Assigned Marshal Alpha to redirect flow away from Gate 2.', actor: 'AI Incident Commander' },
        { id: 'LOG-3', timestamp: '15:00:05', type: 'DISPATCH', message: 'Flagged ambulance route obstruction as Life Safety Priority 1.', actor: 'Safety Doctrine Engine' }
      ]
    }
  },

  HEALTHCARE_SURGE: {
    id: 'healthcare-surge-02',
    vertical: 'HEALTHCARE_SURGE',
    title: 'Hospital Emergency Mass Casualty Surge',
    tagline: 'Highway pileup casualty influx, CT failure, triage bottleneck',
    initialChaosText: 'Mass casualty incident incoming from highway pileup in 15 minutes: 22 incoming red/yellow patients. ER waiting room already at 140% capacity, CT scanner in radiology threw error code 44, only 2 triage nurses on duty.',
    chaosInjectionQuickPicks: [
      {
        label: '🫁 Oxygen Manifold Pressure Drop',
        text: 'Trauma Bay 2 central oxygen pipeline pressure dropped below 40 PSI.',
        description: 'Requires immediate portable cylinders and respiratory tech dispatch.'
      },
      {
        label: '⚡ Backup Generator Grid Switch',
        text: 'East wing grid flickering, automatic transfer switch showing warning.',
        description: 'Power vulnerability in ICU corridors.'
      },
      {
        label: '🩸 O-Negative Blood Shortage',
        text: 'Blood bank down to 4 units of uncrossed O-negative emergency supply.',
        description: 'Requires immediate regional blood center emergency courier dispatch.'
      }
    ],
    initialState: {
      id: 'INC-2026-MED',
      codeName: 'OPERATION RED PULSE',
      vertical: 'HEALTHCARE_SURGE',
      verticalTitle: 'Emergency Department & Hospital Incident Command',
      originalSituation: 'Mass casualty incident incoming from highway pileup in 15 minutes: 22 incoming red/yellow patients. ER waiting room already at 140% capacity, CT scanner in radiology threw error code 44, only 2 triage nurses on duty.',
      severity: 'LEVEL_4_CRITICAL',
      startTime: 'T-15 mins to Mass Casualty Arrival',
      operationalPeriod: '12:00 - 14:00 UTC',
      incidentCommander: 'AI Incident Commander (Trauma Lead)',
      stateVersion: 1,
      activeUnitsCount: 22,
      totalVolunteers: 28,
      activeVolunteers: 26,
      nowActions: [
        {
          id: 'ACT-NOW-M1',
          title: 'Decant low-acuity ER waiting room to Outpatient Clinic',
          description: 'Transfer all Green (Walking Wounded) patients immediately to adjacent Ambulatory Wing to clear ER floor for incoming reds.',
          category: 'NOW',
          assignee: 'Nurse Supervisor Karen B.',
          zoneId: 'ZONE_ER_WAITING',
          status: 'IN_PROGRESS',
          urgency: 'CRITICAL',
          estimatedMinutes: 2,
          explainability: {
            triggerFactor: 'ER waiting room at 140% capacity ahead of 22 incoming trauma patients.',
            governingPolicy: 'Hospital Disaster Protocol §5.1 (Rapid Reverse Triage)',
            rationale: 'Creates 18 open physical bay spaces for urgent gurney intake.',
            tradeoffsRejected: ['Refusing incoming ambulance transport (violates emergency triage ethics)']
          }
        },
        {
          id: 'ACT-NOW-M2',
          title: 'Emergency call-in for 4 off-duty Triage & Trauma Nurses',
          description: 'Trigger Automated Mass Recall SMS to on-call roster for emergency overtime triage reinforcement.',
          category: 'NOW',
          assignee: 'Hospital Staffing Coordinator',
          zoneId: 'ZONE_TRIAGE',
          status: 'PENDING',
          urgency: 'CRITICAL',
          estimatedMinutes: 3,
          explainability: {
            triggerFactor: 'Only 2 nurses currently managing critical triage line.',
            governingPolicy: 'Nurse-to-Patient Trauma Ratio (Target 1:1 or 1:2)',
            rationale: 'Current staff would experience cognitive collapse within 10 minutes of arrival.',
            tradeoffsRejected: ['Pulling nurses from Pediatric ICU']
          }
        },
        {
          id: 'ACT-NOW-M3',
          title: 'Divert CT Neuro scans to Memorial Hospital Partner',
          description: 'Establish immediate telemetry link with Memorial Radiology for remote trauma imaging and initiate portable ultrasound (FAST) protocol.',
          category: 'NOW',
          assignee: 'Lead Radiologist Dr. Chen',
          zoneId: 'ZONE_RADIOLOGY',
          status: 'IN_PROGRESS',
          urgency: 'HIGH',
          estimatedMinutes: 3,
          explainability: {
            triggerFactor: 'Primary CT scanner hardware error 44.',
            governingPolicy: 'Imaging Redundancy SOP',
            rationale: 'FAST ultrasound can triage internal hemorrhage at bedside while bio-med resets CT.',
            tradeoffsRejected: ['Holding patients until CT reboot succeeds']
          }
        }
      ],
      next10MinActions: [
        {
          id: 'ACT-NEXT-M1',
          title: 'Open Ambulatory Surgery Center as Overflow Trauma Bays',
          description: 'Unlock 6 pre-op recovery suites for stabilization and ventilator staging.',
          category: 'NEXT_10_MIN',
          assignee: 'Surgical Charge Nurse',
          zoneId: 'ZONE_SURGERY',
          status: 'PENDING',
          urgency: 'HIGH',
          estimatedMinutes: 8,
          explainability: {
            triggerFactor: '22 trauma admissions will exceed main trauma bay capacity by 9 patients.',
            governingPolicy: 'Surge Facility Expansion Framework',
            rationale: 'Pre-op suites have oxygen drops and suction already installed.',
            tradeoffsRejected: ['Staging patients in hospital hallways']
          }
        },
        {
          id: 'ACT-NEXT-M2',
          title: 'Request Regional Blood Center Emergency Courier',
          description: 'Order 20 units O-neg and 15 units plasma on priority police escort transit.',
          category: 'NEXT_10_MIN',
          assignee: 'Blood Bank Technologist',
          zoneId: 'ZONE_BLOOD_BANK',
          status: 'PENDING',
          urgency: 'HIGH',
          estimatedMinutes: 6,
          explainability: {
            triggerFactor: 'High-speed highway pileups characteristically present severe exsanguination.',
            governingPolicy: 'Massive Transfusion Protocol Activation',
            rationale: 'Replenishes inventory before supply exhaustion.',
            tradeoffsRejected: ['Waiting for cross-match results on arrival']
          }
        }
      ],
      monitorMetrics: [
        {
          id: 'METRIC-M1',
          name: 'ER Bed Capacity',
          value: '142% (Critical Overload)',
          numericValue: 142,
          unit: '%',
          status: 'CRITICAL',
          trend: 'UP',
          targetThreshold: '< 100%',
          history: [90, 110, 125, 138, 142]
        },
        {
          id: 'METRIC-M2',
          name: 'Incoming Red/Yellow Gurneys',
          value: '22 Expected',
          numericValue: 22,
          unit: 'patients',
          status: 'CRITICAL',
          trend: 'UP',
          targetThreshold: '< 5',
          history: [0, 4, 12, 18, 22]
        },
        {
          id: 'METRIC-M3',
          name: 'Trauma Staff Availability',
          value: '42% Deficit',
          numericValue: 58,
          unit: '%',
          status: 'WARNING',
          trend: 'STABLE',
          targetThreshold: '>= 90%',
          history: [80, 70, 60, 58, 58]
        }
      ],
      escalateConditions: [
        {
          id: 'ESC-M1',
          condition: 'Incoming patients exceed available trauma resuscitation beds by > 6',
          thresholdValue: '> 6 deficit',
          currentObserved: '7 deficit',
          isTriggered: true,
          consequence: 'Declare Formal Regional Code Black: Divert non-critical ambulances to St. Jude.',
          targetRole: 'Chief Medical Officer'
        },
        {
          id: 'ESC-M2',
          condition: 'O-Negative blood stock falls below 4 units',
          thresholdValue: '< 4 units',
          currentObserved: '6 units remaining',
          isTriggered: false,
          consequence: 'Initiate emergency whole blood donation drive from hospital pre-screened staff.',
          targetRole: 'Blood Bank Director'
        }
      ],
      zones: [
        { id: 'ZONE_AMBULANCE_BAY', name: 'Ambulance Bay Intake', type: 'ROUTE', status: 'CONGESTED', capacityPct: 85, x: 18, y: 35, connections: ['ZONE_TRIAGE'], unitsDeployed: 6 },
        { id: 'ZONE_TRIAGE', name: 'Rapid Triage Area', type: 'HUB', status: 'CONGESTED', capacityPct: 90, x: 38, y: 35, connections: ['ZONE_AMBULANCE_BAY', 'ZONE_ER_WAITING', 'ZONE_TRAUMA'], unitsDeployed: 4 },
        { id: 'ZONE_ER_WAITING', name: 'Main ER Waiting Room', type: 'SHELTER', status: 'HAZARD', capacityPct: 142, x: 38, y: 70, connections: ['ZONE_TRIAGE'], unitsDeployed: 2, hazardNote: 'Severe crowd congestion, agitated relatives' },
        { id: 'ZONE_TRAUMA', name: 'Trauma Bays 1-4', type: 'MEDICAL', status: 'CONGESTED', capacityPct: 92, x: 68, y: 35, connections: ['ZONE_TRIAGE', 'ZONE_RADIOLOGY', 'ZONE_SURGERY'], unitsDeployed: 8 },
        { id: 'ZONE_RADIOLOGY', name: 'Radiology / CT Suite', type: 'MEDICAL', status: 'BLOCKED', capacityPct: 98, x: 70, y: 72, connections: ['ZONE_TRAUMA'], unitsDeployed: 2, hazardNote: 'CT Scanner down (Error 44)' },
        { id: 'ZONE_SURGERY', name: 'Ambulatory Surgery Expansion', type: 'MEDICAL', status: 'CLEAR', capacityPct: 20, x: 90, y: 35, connections: ['ZONE_TRAUMA'], unitsDeployed: 3 }
      ],
      stateGraph: [
        { step: 'SITUATION', timestamp: '12:00:00', description: 'Mass casualty advisory received: 22 trauma cases incoming, CT broken.', active: false },
        { step: 'STATE', timestamp: '12:00:02', description: 'Calculated critical trauma bed gap of 7, decant requirements identified.', active: false },
        { step: 'DECISION', timestamp: '12:00:04', description: 'Initiated rapid reverse triage decant, staff recall, and FAST ultrasound protocol.', active: false },
        { step: 'ACTION', timestamp: '12:00:06', description: 'Execution underway across triage and surgical expansion wings.', active: true },
        { step: 'NEW_STATE', timestamp: '12:00:10', description: 'Standing by for ambulance arrival telemetry.', active: false }
      ],
      auditTrail: [
        { id: 'LOG-M1', timestamp: '12:00:01', type: 'STATE_CHANGE', message: 'Hospital Disaster Protocol Level 4 engaged.', actor: 'AI Incident Commander' },
        { id: 'LOG-M2', timestamp: '12:00:04', type: 'ESCALATION', message: 'Escalation triggered: Trauma bed deficit exceeds 6. Regional diversion requested.', actor: 'AI Incident Commander' }
      ]
    }
  },

  TRANSIT_TERMINAL: {
    id: 'transit-terminal-03',
    vertical: 'TRANSIT_TERMINAL',
    title: 'Metro Hub Power Outage & Stampede Risk',
    tagline: 'Platform blackout, halted escalators, incoming express trains',
    initialChaosText: 'Rush hour central underground metro hub. Complete power loss on Track 3, escalators stalled on Concourse B creating massive human stampede bottleneck, two inbound express trains arriving in 4 minutes with 3,000 commuters.',
    chaosInjectionQuickPicks: [
      {
        label: '🚪 Emergency Exit 4 Jammed',
        text: 'Emergency exit shutter 4 on Concourse B failed to release automatically.',
        description: 'Traps exiting crowd in blind corridor; requires manual pry team.'
      },
      {
        label: '💨 Smoke Detected in Tunnel 2',
        text: 'Air sniffers detecting electrical burning smoke in Tunnel 2 south portal.',
        description: 'Triggers automatic exhaust fan purge and tunnel evacuation.'
      }
    ],
    initialState: {
      id: 'INC-2026-METRO',
      codeName: 'OPERATION IRON TUBE',
      vertical: 'TRANSIT_TERMINAL',
      verticalTitle: 'Transit Operations & Urban Crowd Control',
      originalSituation: 'Rush hour central underground metro hub. Complete power loss on Track 3, escalators stalled on Concourse B creating massive human stampede bottleneck, two inbound express trains arriving in 4 minutes with 3,000 commuters.',
      severity: 'LEVEL_4_CRITICAL',
      startTime: 'T-4 mins to Express Train Inbound',
      operationalPeriod: '17:45 - 18:30 Local',
      incidentCommander: 'AI Incident Commander (Rail Operations)',
      stateVersion: 1,
      activeUnitsCount: 18,
      totalVolunteers: 20,
      activeVolunteers: 18,
      nowActions: [
        {
          id: 'ACT-NOW-T1',
          title: 'Halt inbound trains outside tunnel portal',
          description: 'Trigger signal red block on Rail Lines 2 & 3 to hold inbound trains at pre-station signals; prevent dumping 3,000 passengers onto crowded platform.',
          category: 'NOW',
          assignee: 'Rail Traffic Controller (Dispatch Desk)',
          zoneId: 'ZONE_TRACK_3',
          status: 'IN_PROGRESS',
          urgency: 'CRITICAL',
          estimatedMinutes: 1,
          explainability: {
            triggerFactor: '3,000 commuters arriving to a blacked-out platform with stalled egress.',
            governingPolicy: 'Mass Transit Safety Standard §12 (Platform Surge Suppression)',
            rationale: 'Avoids deadly crush on narrow platform edges with live 750V third rail.',
            tradeoffsRejected: ['Allowing trains to discharge slowly']
          }
        },
        {
          id: 'ACT-NOW-T2',
          title: 'Convert stalled escalators into one-way ascending stairs',
          description: 'Deploy 4 transit police officers to guide queue upward and prevent reverse surging.',
          category: 'NOW',
          assignee: 'Station Officer Ramirez',
          zoneId: 'ZONE_CONCOURSE_B',
          status: 'IN_PROGRESS',
          urgency: 'CRITICAL',
          estimatedMinutes: 2,
          explainability: {
            triggerFactor: 'Stalled escalators creating crowd compaction at base.',
            governingPolicy: 'NFPA 130 Station Egress Flow Directive',
            rationale: 'Maintains continuous outward velocity of pedestrians toward surface street.',
            tradeoffsRejected: ['Barricading escalators entirely']
          }
        }
      ],
      next10MinActions: [
        {
          id: 'ACT-NEXT-T1',
          title: 'Activate emergency diesel generator for Platform 3 lighting',
          description: 'Dispatch electrical engineer to substation auxiliary breaker panel.',
          category: 'NEXT_10_MIN',
          assignee: 'Substation Technician Dave',
          zoneId: 'ZONE_TRACK_3',
          status: 'PENDING',
          urgency: 'HIGH',
          estimatedMinutes: 5,
          explainability: {
            triggerFactor: 'Complete darkness elevates panic index.',
            governingPolicy: 'Life Safety Emergency Illumination Rule',
            rationale: 'Restores visibility to prevent track falls.',
            tradeoffsRejected: ['Using handheld flashlights indefinitely']
          }
        }
      ],
      monitorMetrics: [
        { id: 'METRIC-T1', name: 'Platform 3 Density', value: '96% (Crush Danger)', numericValue: 96, unit: '%', status: 'CRITICAL', trend: 'UP', targetThreshold: '< 70%', history: [60, 75, 88, 93, 96] },
        { id: 'METRIC-T2', name: 'Concourse Egress Rate', value: '180 pax/min (Slowed)', numericValue: 180, unit: 'pax/m', status: 'WARNING', trend: 'DOWN', targetThreshold: '> 450', history: [500, 420, 310, 220, 180] }
      ],
      escalateConditions: [
        { id: 'ESC-T1', condition: 'Platform crowd exceeds 95% capacity for > 2 mins', thresholdValue: '95%', currentObserved: '96% (BREACH)', isTriggered: true, consequence: 'Sound Station Evacuation Alarm; trigger street level turnstile free-spin.', targetRole: 'Station Master' }
      ],
      zones: [
        { id: 'ZONE_TRACK_3', name: 'Platform 3 (Deep Level)', type: 'ROUTE', status: 'HAZARD', capacityPct: 96, x: 25, y: 70, connections: ['ZONE_CONCOURSE_B'], unitsDeployed: 6, hazardNote: 'Power failure, dark platform' },
        { id: 'ZONE_CONCOURSE_B', name: 'Concourse B Escalator Bank', type: 'HUB', status: 'CONGESTED', capacityPct: 92, x: 50, y: 50, connections: ['ZONE_TRACK_3', 'ZONE_STREET_EXIT'], unitsDeployed: 8, hazardNote: 'Stalled escalators, choke point' },
        { id: 'ZONE_STREET_EXIT', name: 'Surface Plaza / Street Egress', type: 'PERIMETER', status: 'CLEAR', capacityPct: 30, x: 75, y: 25, connections: ['ZONE_CONCOURSE_B'], unitsDeployed: 4 }
      ],
      stateGraph: [
        { step: 'SITUATION', timestamp: '17:45:00', description: 'Platform 3 power failure, escalator choke, trains arriving.', active: false },
        { step: 'STATE', timestamp: '17:45:01', description: 'Platform density breached 95%, fatal crush hazard flagged.', active: false },
        { step: 'DECISION', timestamp: '17:45:02', description: 'Red signal hold issued, escalators converted to upward egress.', active: true },
        { step: 'ACTION', timestamp: '17:45:04', description: 'Police marshals in position at Concourse B.', active: false },
        { step: 'NEW_STATE', timestamp: '17:45:06', description: 'Inbound trains held outside tunnel.', active: false }
      ],
      auditTrail: [
        { id: 'LOG-T1', timestamp: '17:45:02', type: 'DISPATCH', message: 'Executed emergency signal hold on Lines 2 & 3.', actor: 'AI Incident Commander' }
      ]
    }
  },

  URBAN_DISASTER: {
    id: 'urban-disaster-04',
    vertical: 'URBAN_DISASTER',
    title: 'Flash Flood & River Basin Breach',
    tagline: 'Riverbank overtopping, flooded evacuation bridge, stranded community shelter',
    initialChaosText: 'Flash flood alert: River Ganga/Yamuna basin wall breached in Sector 4. Main bridge connecting East Bank is inundated under 1.5m water, 140 elderly residents stranded at Community Center, and diesel backup generator has only 40 minutes fuel.',
    chaosInjectionQuickPicks: [
      {
        label: '🌊 Levee Breach Widened',
        text: 'Erosion caused an additional 15-meter collapse of the secondary earthen levee.',
        description: 'Accelerates water rise by 0.5m/hr in Sector 4.'
      },
      {
        label: '⚡ High-Tension Wire Submerged',
        text: 'Live 11kV electrical feeder line snapped into floodwater near Sector 4 market.',
        description: 'Immediate electrocution zone; requires grid disconnection.'
      }
    ],
    initialState: {
      id: 'INC-2026-FLOOD',
      codeName: 'OPERATION JAL-RAKSHA',
      vertical: 'URBAN_DISASTER',
      verticalTitle: 'Disaster Management & Flood Rescue',
      originalSituation: 'Flash flood alert: River basin wall breached in Sector 4. Main bridge connecting East Bank is inundated under 1.5m water, 140 elderly residents stranded at Community Center, and diesel backup generator has only 40 minutes fuel.',
      severity: 'LEVEL_4_CRITICAL',
      startTime: 'T-0 mins Water Inundation Active',
      operationalPeriod: '08:00 - 12:00 Local',
      incidentCommander: 'AI Incident Commander (NDRF / Disaster Lead)',
      stateVersion: 1,
      activeUnitsCount: 26,
      totalVolunteers: 35,
      activeVolunteers: 30,
      nowActions: [
        {
          id: 'ACT-NOW-F1',
          title: 'Deploy inflatable motorized rescue boats (IRB) to Community Center',
          description: 'Dispatch 6 boats with life jackets to evacuate non-ambulatory elderly residents to High Ground School.',
          category: 'NOW',
          assignee: 'NDRF Boat Unit 4',
          zoneId: 'ZONE_COMMUNITY_CENTER',
          status: 'IN_PROGRESS',
          urgency: 'CRITICAL',
          estimatedMinutes: 2,
          explainability: {
            triggerFactor: 'Community center ground floor flooding, generator fuel low.',
            governingPolicy: 'Life Safety Priority 1 (Vulnerable Population Evacuation)',
            rationale: 'Water level rising at 12cm/hr; window before first-floor submergence is 90 mins.',
            tradeoffsRejected: ['Waiting for amphibious military trucks (too slow to mobilize)']
          }
        },
        {
          id: 'ACT-NOW-F2',
          title: 'Close inundated East Bank Bridge to all pedestrian & vehicle traffic',
          description: 'Erect concrete road blocks and patrol units to prevent vehicles attempting crossing through 1.5m swift water.',
          category: 'NOW',
          assignee: 'Traffic Police Sector 4',
          zoneId: 'ZONE_MAIN_BRIDGE',
          status: 'IN_PROGRESS',
          urgency: 'CRITICAL',
          estimatedMinutes: 2,
          explainability: {
            triggerFactor: '1.5m water depth has sufficient hydrostatic force to sweep heavy vehicles.',
            governingPolicy: 'Turn Around Don’t Drown Safety Doctrine',
            rationale: 'Prevents drownings from reckless crossing attempts.',
            tradeoffsRejected: ['Allowing high-clearance SUVs to cross']
          }
        }
      ],
      next10MinActions: [
        {
          id: 'ACT-NEXT-F1',
          title: 'Airdrop emergency diesel jerrycans via Coast Guard / Air Force chopper',
          description: 'Coordinate helicopter delivery to Community Center roof terrace to keep medical oxygen concentrators powered.',
          category: 'NEXT_10_MIN',
          assignee: 'Air Operations Coordinator',
          zoneId: 'ZONE_COMMUNITY_CENTER',
          status: 'PENDING',
          urgency: 'HIGH',
          estimatedMinutes: 9,
          explainability: {
            triggerFactor: 'Fuel exhausted in 40 minutes.',
            governingPolicy: 'Critical Infrastructure Fuel Continuity',
            rationale: 'Maintains life support devices for patients unable to move immediately.',
            tradeoffsRejected: ['Relying on ground portage through swift water']
          }
        }
      ],
      monitorMetrics: [
        { id: 'METRIC-F1', name: 'River Water Gauge', value: '+1.6m Above Danger Mark', numericValue: 1.6, unit: 'm', status: 'CRITICAL', trend: 'UP', targetThreshold: '< 0.0m', history: [0.2, 0.7, 1.1, 1.4, 1.6] },
        { id: 'METRIC-F2', name: 'Community Center Evacuation', value: '18% Completed (25/140)', numericValue: 18, unit: '%', status: 'WARNING', trend: 'UP', targetThreshold: '100%', history: [0, 5, 10, 15, 18] }
      ],
      escalateConditions: [
        { id: 'ESC-F1', condition: 'Water level reaches 2.0m or bridge structural abutment shifts', thresholdValue: '2.0m', currentObserved: '1.6m (Rising)', isTriggered: false, consequence: 'Authorize aerial winch extraction from rooftop.', targetRole: 'Air Wing Commander' }
      ],
      zones: [
        { id: 'ZONE_MAIN_BRIDGE', name: 'Sector 4 East Bridge', type: 'ROUTE', status: 'BLOCKED', capacityPct: 100, x: 25, y: 50, connections: ['ZONE_COMMUNITY_CENTER'], unitsDeployed: 4, hazardNote: 'Inundated under 1.5m water' },
        { id: 'ZONE_COMMUNITY_CENTER', name: 'Community Center Shelter', type: 'SHELTER', status: 'HAZARD', capacityPct: 90, x: 55, y: 50, connections: ['ZONE_MAIN_BRIDGE', 'ZONE_HIGH_GROUND'], unitsDeployed: 12, hazardNote: '140 trapped, fuel low' },
        { id: 'ZONE_HIGH_GROUND', name: 'High Ground High School', type: 'SHELTER', status: 'CLEAR', capacityPct: 35, x: 80, y: 25, connections: ['ZONE_COMMUNITY_CENTER'], unitsDeployed: 8 }
      ],
      stateGraph: [
        { step: 'SITUATION', timestamp: '08:00:00', description: 'River basin breach, bridge underwater, 140 stranded.', active: false },
        { step: 'STATE', timestamp: '08:00:02', description: 'Level 4 Critical, 40m fuel window, water rise 12cm/hr.', active: false },
        { step: 'DECISION', timestamp: '08:00:03', description: 'Motorized rescue boats deployed, bridge closed, helicopter fuel dispatched.', active: true },
        { step: 'ACTION', timestamp: '08:00:05', description: 'Evacuations underway.', active: false },
        { step: 'NEW_STATE', timestamp: '08:00:08', description: 'Monitoring water height.', active: false }
      ],
      auditTrail: [
        { id: 'LOG-F1', timestamp: '08:00:02', type: 'STATE_CHANGE', message: 'Declared Level 4 Critical Flood Emergency.', actor: 'AI Incident Commander' }
      ]
    }
  },

  HAZMAT_INDUSTRIAL: {
    id: 'hazmat-05',
    vertical: 'HAZMAT_INDUSTRIAL',
    title: 'Chemical Plant Gas Leak & Vapor Cloud',
    tagline: 'Toxic ammonia valve failure, shifting wind direction, residential perimeter',
    initialChaosText: 'Chemical refinery plant alert: Ammonia gas vapor release from storage tank 14. Primary isolation valve jammed open at 60%, plume drifting north-northwest towards suburban residential boundary 400m away, decontamination station queue backed up.',
    chaosInjectionQuickPicks: [
      {
        label: '💨 Wind Shift Toward School',
        text: 'Wind shifted sharply 45 degrees East toward St. Mary Elementary School at 18 knots.',
        description: 'Threatens school zone; triggers immediate reverse 911 shelter-in-place.'
      },
      {
        label: '🔥 Secondary Tank Overpressure',
        text: 'Adjacent propane vessel pressure relief valve venting high-pitched whistle.',
        description: 'BLEVE explosion hazard risk.'
      }
    ],
    initialState: {
      id: 'INC-2026-HAZMAT',
      codeName: 'OPERATION VAPOR GUARD',
      vertical: 'HAZMAT_INDUSTRIAL',
      verticalTitle: 'Industrial Safety & Hazmat Containment',
      originalSituation: 'Chemical refinery plant alert: Ammonia gas vapor release from storage tank 14. Primary isolation valve jammed open at 60%, plume drifting north-northwest towards suburban residential boundary 400m away, decontamination station queue backed up.',
      severity: 'LEVEL_4_CRITICAL',
      startTime: 'T-0 mins Plume Active',
      operationalPeriod: '10:00 - 11:30 Local',
      incidentCommander: 'AI Incident Commander (Hazmat Specialist)',
      stateVersion: 1,
      activeUnitsCount: 16,
      totalVolunteers: 18,
      activeVolunteers: 15,
      nowActions: [
        {
          id: 'ACT-NOW-H1',
          title: 'Deploy Water Fog Curtain to Knock Down Ammonia Vapor',
          description: 'Position two high-volume deluge monitor trucks downwind to dissolve anhydrous ammonia vapor with heavy water fog curtain.',
          category: 'NOW',
          assignee: 'Hazmat Fire Engine 9',
          zoneId: 'ZONE_TANK_FARM',
          status: 'IN_PROGRESS',
          urgency: 'CRITICAL',
          estimatedMinutes: 2,
          explainability: {
            triggerFactor: 'Ammonia plume expanding rapidly toward residential sector.',
            governingPolicy: 'EPA / OSHA Hazmat Response Manual Guide 154',
            rationale: 'Ammonia has high water affinity; water curtain absorbs and neutralizes airborne toxic vapor.',
            tradeoffsRejected: ['Approaching tank manually without fog protection (lethal risk)']
          }
        },
        {
          id: 'ACT-NOW-H2',
          title: 'Sound Reverse-911 Shelter-in-Place for North Sector',
          description: 'Broadcast urgent wireless emergency alerts (WEA): seal windows, turn off HVAC/air conditioners, remain indoors.',
          category: 'NOW',
          assignee: 'Municipal Emergency Management',
          zoneId: 'ZONE_RESIDENTIAL',
          status: 'IN_PROGRESS',
          urgency: 'CRITICAL',
          estimatedMinutes: 1,
          explainability: {
            triggerFactor: 'Plume transit time to homes is estimated at 6 minutes.',
            governingPolicy: 'Community Protection Immediate Action Standard',
            rationale: 'Indoor air infiltration rate gives 30-45 minutes protection if sealed.',
            tradeoffsRejected: ['Immediate outdoor vehicle evacuation (would trap residents in traffic inside toxic cloud)']
          }
        }
      ],
      next10MinActions: [
        {
          id: 'ACT-NEXT-H1',
          title: 'Deploy Level A Hazmat Entry Team to Manual Bypass Valve',
          description: 'Suit up two responders in encapsulating Level A suits with SCBA to reach secondary shutoff flange.',
          category: 'NEXT_10_MIN',
          assignee: 'Hazmat Strike Team Charlie',
          zoneId: 'ZONE_TANK_FARM',
          status: 'PENDING',
          urgency: 'CRITICAL',
          estimatedMinutes: 7,
          explainability: {
            triggerFactor: 'Primary pneumatic valve mechanical failure.',
            governingPolicy: 'OSHA 1910.120 Hazardous Waste Operations',
            rationale: 'Permanent source isolation is required to prevent 20-ton tank drainage.',
            tradeoffsRejected: ['Waiting for tank to empty itself']
          }
        }
      ],
      monitorMetrics: [
        { id: 'METRIC-H1', name: 'Fence-line NH3 PPM', value: '48 PPM (IDLH Danger > 300)', numericValue: 48, unit: 'PPM', status: 'WARNING', trend: 'UP', targetThreshold: '< 25 PPM', history: [5, 12, 28, 41, 48] },
        { id: 'METRIC-H2', name: 'Wind Speed & Direction', value: '12 kts NNW', numericValue: 12, unit: 'kts', status: 'WARNING', trend: 'STABLE', targetThreshold: 'Calm', history: [8, 10, 11, 12, 12] }
      ],
      escalateConditions: [
        { id: 'ESC-H1', condition: 'Perimeter NH3 exceeds 50 PPM or wind shifts toward schools', thresholdValue: '50 PPM', currentObserved: '48 PPM', isTriggered: false, consequence: 'Order mandatory evacuation of zones within 1.5km radius.', targetRole: 'Hazmat Incident Commander' }
      ],
      zones: [
        { id: 'ZONE_TANK_FARM', name: 'Tank Farm Sector B', type: 'HAZARD', status: 'HAZARD', capacityPct: 95, x: 25, y: 65, connections: ['ZONE_PERIMETER_FENCE'], unitsDeployed: 8, hazardNote: 'Active toxic gas leak' },
        { id: 'ZONE_PERIMETER_FENCE', name: 'Plant Perimeter Fence', type: 'PERIMETER', status: 'CONGESTED', capacityPct: 75, x: 50, y: 45, connections: ['ZONE_TANK_FARM', 'ZONE_RESIDENTIAL'], unitsDeployed: 4 },
        { id: 'ZONE_RESIDENTIAL', name: 'North Residential Community', type: 'SHELTER', status: 'WARNING' as unknown as 'CONGESTED', capacityPct: 60, x: 75, y: 25, connections: ['ZONE_PERIMETER_FENCE'], unitsDeployed: 4, hazardNote: 'Shelter in place active' }
      ],
      stateGraph: [
        { step: 'SITUATION', timestamp: '10:00:00', description: 'Tank 14 ammonia leak, valve stuck, plume drifting toward homes.', active: false },
        { step: 'STATE', timestamp: '10:00:02', description: 'Threat level 4, 6-minute window to residential perimeter.', active: false },
        { step: 'DECISION', timestamp: '10:00:04', description: 'Water fog knockdown launched, reverse-911 issued, Level A team prepared.', active: true },
        { step: 'ACTION', timestamp: '10:00:06', description: 'Deluge monitors deployed.', active: false },
        { step: 'NEW_STATE', timestamp: '10:00:08', description: 'Perimeter monitoring active.', active: false }
      ],
      auditTrail: [
        { id: 'LOG-H1', timestamp: '10:00:01', type: 'STATE_CHANGE', message: 'Hazmat Incident Command activated.', actor: 'AI Incident Commander' }
      ]
    }
  }
};
