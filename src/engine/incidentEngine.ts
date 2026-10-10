/**
 * CrisisBridge Core Incident Engine
 * 
 * Transforms unstructured chaotic text into structured Incident States.
 * Maintains state machine lifecycle:
 * Situation → State → Decision → Action → New State → Decision
 */

import type { IncidentState, ActionItem, MonitorMetric, EscalateCondition, ZoneNode, StateNode } from '../types/incident';
import { SecurityGuard } from '../utils/security';
import { PRESET_SCENARIOS } from '../data/defaultScenarios';

export class IncidentEngine {
  /**
   * Initializes state from a known preset
   */
  public static loadPreset(presetKey: keyof typeof PRESET_SCENARIOS): IncidentState {
    const scenario = PRESET_SCENARIOS[presetKey];
    return JSON.parse(JSON.stringify(scenario.initialState));
  }

  /**
   * Dynamically parses ANY user chaotic text input into an ICS-compliant IncidentState
   */
  public static parseChaosSituation(rawInput: string, commanderTitle = 'AI Incident Commander'): IncidentState {
    const cleanText = SecurityGuard.sanitizeInput(rawInput);
    const timeNow = new Date().toTimeString().slice(0, 8);
    const dateStr = new Date().toLocaleDateString();

    // Check for matching keywords to customize vertical
    const lower = cleanText.toLowerCase();
    let vertical: IncidentState['vertical'] = 'CAMPUS_EVENT';
    let verticalTitle = 'General Incident Management & Rapid Response';
    let codeName = 'OPERATION RESOLVE';
    let severity: IncidentState['severity'] = 'LEVEL_3_SEVERE';

    if (lower.includes('hospital') || lower.includes('patient') || lower.includes('casualty') || lower.includes('triage') || lower.includes('medic') || lower.includes('doctor')) {
      vertical = 'HEALTHCARE_SURGE';
      verticalTitle = 'Healthcare Operations & Emergency Surge';
      codeName = 'OPERATION BIO-DEFENSE';
      severity = 'LEVEL_4_CRITICAL';
    } else if (lower.includes('train') || lower.includes('flight') || lower.includes('metro') || lower.includes('airport') || lower.includes('bus') || lower.includes('transit')) {
      vertical = 'TRANSIT_TERMINAL';
      verticalTitle = 'Transportation Hub & Passenger Safety';
      codeName = 'OPERATION CLEARWAY';
      severity = 'LEVEL_3_SEVERE';
    } else if (lower.includes('flood') || lower.includes('storm') || lower.includes('water') || lower.includes('quake') || lower.includes('cyclone') || lower.includes('tsunami')) {
      vertical = 'URBAN_DISASTER';
      verticalTitle = 'Disaster Response & Flood Evacuation';
      codeName = 'OPERATION SAFE-HAVEN';
      severity = 'LEVEL_4_CRITICAL';
    } else if (lower.includes('chemical') || lower.includes('gas') || lower.includes('leak') || lower.includes('fire') || lower.includes('hazmat') || lower.includes('explosion')) {
      vertical = 'HAZMAT_INDUSTRIAL';
      verticalTitle = 'Hazardous Materials & Containment';
      codeName = 'OPERATION SHIELD-SECTOR';
      severity = 'LEVEL_4_CRITICAL';
    }

    // Extract sentences or phrases
    const sentences = cleanText
      .split(/[.!?\n]+/)
      .map(s => s.trim())
      .filter(s => s.length > 5);

    const firstPoint = sentences[0] || 'Primary choke point containment';
    const secondPoint = sentences[1] || 'Staff & resource alignment';
    const thirdPoint = sentences[2] || 'Emergency corridor protection';

    const nowActions: ActionItem[] = [
      {
        id: SecurityGuard.generateSecureId('ACT-NOW'),
        title: `Contain primary threat: ${firstPoint.slice(0, 45)}`,
        description: `Deploy field marshals immediately to cordon, isolate and mitigate: "${firstPoint}".`,
        category: 'NOW',
        assignee: 'Rapid Task Force Alpha',
        zoneId: 'ZONE_PRIMARY',
        status: 'IN_PROGRESS',
        urgency: 'CRITICAL',
        estimatedMinutes: 2,
        explainability: {
          triggerFactor: firstPoint,
          governingPolicy: 'ICS Immediate Hazard Suppression Standard',
          rationale: 'Primary life-safety intervention must take precedence before cascading failures occur.',
          tradeoffsRejected: ['Delaying deployment for secondary equipment delivery']
        }
      },
      {
        id: SecurityGuard.generateSecureId('ACT-NOW'),
        title: `Mobilize backup personnel & resolve: ${secondPoint.slice(0, 45)}`,
        description: `Activate reserve team to directly support: "${secondPoint}".`,
        category: 'NOW',
        assignee: 'Logistics Incident Liaison',
        zoneId: 'ZONE_CORE',
        status: 'PENDING',
        urgency: 'HIGH',
        estimatedMinutes: 2,
        explainability: {
          triggerFactor: secondPoint,
          governingPolicy: 'Minimum Operational Ratios Policy',
          rationale: 'Restores operating capacity before crowd stress reaches critical inflection.',
          tradeoffsRejected: ['Reassigning medical staff to general security']
        }
      },
      {
        id: SecurityGuard.generateSecureId('ACT-NOW'),
        title: `Secure arterial route: ${thirdPoint.slice(0, 45)}`,
        description: `Keep designated response paths clear and operational: "${thirdPoint}".`,
        category: 'NOW',
        assignee: 'Arterial Patrol Lead',
        zoneId: 'ZONE_ACCESS',
        status: 'IN_PROGRESS',
        urgency: 'CRITICAL',
        estimatedMinutes: 3,
        explainability: {
          triggerFactor: thirdPoint,
          governingPolicy: 'Zero-Obstruction Egress Protocol',
          rationale: 'Guarantee uninterrupted access for heavy rescue and ambulances.',
          tradeoffsRejected: ['Permitting temporary queue parking on access roads']
        }
      }
    ];

    const next10MinActions: ActionItem[] = [
      {
        id: SecurityGuard.generateSecureId('ACT-NEXT'),
        title: 'Establish alternate bypass and flow distribution',
        description: 'Open secondary corridors and deploy dynamic signage to divide sector load by 40%.',
        category: 'NEXT_10_MIN',
        assignee: 'Perimeter Operations Officer',
        zoneId: 'ZONE_BYPASS',
        status: 'PENDING',
        urgency: 'HIGH',
        estimatedMinutes: 6,
        explainability: {
          triggerFactor: 'High density accumulation in primary sector.',
          governingPolicy: 'Dynamic Flow Equalization Standard',
          rationale: 'Prevents stationary crowd crush by sustaining forward flow rate.',
          tradeoffsRejected: ['Complete perimeter lock down']
        }
      },
      {
        id: SecurityGuard.generateSecureId('ACT-NEXT'),
        title: 'Broadcast inter-agency situation update to external services',
        description: 'Provide police, fire, and municipal dispatch with live tactical map and ingress access codes.',
        category: 'NEXT_10_MIN',
        assignee: 'External Communications Lead',
        zoneId: 'ZONE_HQ',
        status: 'PENDING',
        urgency: 'MEDIUM',
        estimatedMinutes: 5,
        explainability: {
          triggerFactor: 'Escalating complexity requiring potential mutual aid.',
          governingPolicy: 'ICS Form 201 Mutual Aid Briefing Requirement',
          rationale: 'Pre-alerts city services prior to formal escalation threshold breach.',
          tradeoffsRejected: ['Delayed reporting until emergency occurs']
        }
      }
    ];

    const monitorMetrics: MonitorMetric[] = [
      {
        id: 'METRIC-DYN-1',
        name: 'Sector Density Index',
        value: '84% (Elevated)',
        numericValue: 84,
        unit: '%',
        status: 'WARNING',
        trend: 'UP',
        targetThreshold: '< 75%',
        history: [50, 65, 74, 80, 84]
      },
      {
        id: 'METRIC-DYN-2',
        name: 'Egress Route Velocity',
        value: '62% of Nominal',
        numericValue: 62,
        unit: '%',
        status: 'WARNING',
        trend: 'DOWN',
        targetThreshold: '> 85%',
        history: [95, 88, 79, 70, 62]
      },
      {
        id: 'METRIC-DYN-3',
        name: 'Unit Response Latency',
        value: '2.4 mins',
        numericValue: 2.4,
        unit: 'min',
        status: 'NORMAL',
        trend: 'STABLE',
        targetThreshold: '< 3.0 min',
        history: [1.8, 2.0, 2.1, 2.3, 2.4]
      }
    ];

    const escalateConditions: EscalateCondition[] = [
      {
        id: 'ESC-DYN-1',
        condition: 'Primary choke point density exceeds 90% for > 180 seconds',
        thresholdValue: '90%',
        currentObserved: '84%',
        isTriggered: false,
        consequence: 'Trigger hard gate metering; divert all arrivals to holding corral.',
        targetRole: 'Incident Commander'
      },
      {
        id: 'ESC-DYN-2',
        condition: 'Emergency arterial remains blocked for > 4 minutes',
        thresholdValue: '4 mins',
        currentObserved: '2 mins',
        isTriggered: false,
        consequence: 'Authorize secondary arterial through west parking structure.',
        targetRole: 'Logistics Branch Chief'
      },
      {
        id: 'ESC-DYN-3',
        condition: 'Active responder ratio drops below 80%',
        thresholdValue: '< 80%',
        currentObserved: '92% active',
        isTriggered: false,
        consequence: 'Deploy municipal civil defense auxiliary reserve.',
        targetRole: 'Operations Section Chief'
      }
    ];

    const zones: ZoneNode[] = [
      {
        id: 'ZONE_PRIMARY',
        name: 'Sector Alpha (Primary Incident)',
        type: 'GATE',
        status: 'CONGESTED',
        capacityPct: 84,
        x: 25,
        y: 60,
        connections: ['ZONE_ACCESS', 'ZONE_CORE'],
        unitsDeployed: 6,
        hazardNote: firstPoint.slice(0, 40)
      },
      {
        id: 'ZONE_ACCESS',
        name: 'Emergency Access Route',
        type: 'ROUTE',
        status: 'CONGESTED',
        capacityPct: 75,
        x: 50,
        y: 35,
        connections: ['ZONE_PRIMARY', 'ZONE_CORE'],
        unitsDeployed: 3
      },
      {
        id: 'ZONE_CORE',
        name: 'Central Assembly Hub',
        type: 'HUB',
        status: 'CLEAR',
        capacityPct: 40,
        x: 65,
        y: 65,
        connections: ['ZONE_PRIMARY', 'ZONE_ACCESS', 'ZONE_BYPASS'],
        unitsDeployed: 5
      },
      {
        id: 'ZONE_BYPASS',
        name: 'Secondary Bypass Corridor',
        type: 'ROUTE',
        status: 'CLEAR',
        capacityPct: 20,
        x: 80,
        y: 35,
        connections: ['ZONE_CORE'],
        unitsDeployed: 2
      }
    ];

    const stateGraph: StateNode[] = [
      { step: 'SITUATION', timestamp: timeNow, description: `Chaos digested: "${cleanText.slice(0, 60)}..."`, active: false },
      { step: 'STATE', timestamp: timeNow, description: `Threat classified as ${severity}. 4 zones mapped.`, active: false },
      { step: 'DECISION', timestamp: timeNow, description: `Formulated ${nowActions.length} NOW and ${next10MinActions.length} NEXT 10M actions.`, active: false },
      { step: 'ACTION', timestamp: timeNow, description: 'Directives dispatched to response field teams.', active: true },
      { step: 'NEW_STATE', timestamp: timeNow, description: 'Continuous monitoring active; awaiting updates.', active: false }
    ];

    return {
      id: SecurityGuard.generateSecureId('INC-DYN'),
      codeName,
      vertical,
      verticalTitle,
      originalSituation: cleanText,
      severity,
      startTime: `${dateStr} ${timeNow}`,
      operationalPeriod: 'Active Operational Period (Initial 60m)',
      incidentCommander: commanderTitle,
      stateVersion: 1,
      nowActions,
      next10MinActions,
      monitorMetrics,
      escalateConditions,
      zones,
      activeUnitsCount: 16,
      totalVolunteers: 20,
      activeVolunteers: 18,
      stateGraph,
      auditTrail: [
        {
          id: SecurityGuard.generateSecureId('AUD'),
          timestamp: timeNow,
          type: 'STATE_CHANGE',
          message: `Parsed custom chaotic situation into structured Incident Action Matrix.`,
          actor: commanderTitle
        }
      ]
    };
  }

  /**
   * Toggles the completion or status of an action item and cascades state update
   */
  public static toggleActionStatus(
    current: IncidentState,
    actionId: string,
    newStatus: ActionItem['status']
  ): IncidentState {
    const timeNow = new Date().toTimeString().slice(0, 8);
    let targetTitle = '';

    const updateList = (list: ActionItem[]) =>
      list.map(act => {
        if (act.id === actionId) {
          targetTitle = act.title;
          return { ...act, status: newStatus };
        }
        return act;
      });

    const updatedNow = updateList(current.nowActions);
    const updatedNext = updateList(current.next10MinActions);

    // Check if all NOW actions are completed
    const allNowDone = updatedNow.every(a => a.status === 'COMPLETED' || a.status === 'BLOCKED');
    
    const updatedGraph = current.stateGraph.map(node => {
      if (node.step === 'ACTION' && allNowDone) {
        return { ...node, active: false };
      }
      if (node.step === 'NEW_STATE' && allNowDone) {
        return { ...node, active: true, description: 'All immediate actions completed. Situation stabilized.' };
      }
      return node;
    });

    const updatedAudit = [
      {
        id: SecurityGuard.generateSecureId('AUD'),
        timestamp: timeNow,
        type: 'STATE_CHANGE' as const,
        message: `Action "${targetTitle.slice(0, 40)}" marked as ${newStatus}.`,
        actor: 'Incident Operations Lead'
      },
      ...current.auditTrail
    ];

    return {
      ...current,
      stateVersion: current.stateVersion + 1,
      nowActions: updatedNow,
      next10MinActions: updatedNext,
      stateGraph: updatedGraph,
      auditTrail: updatedAudit
    };
  }
}
