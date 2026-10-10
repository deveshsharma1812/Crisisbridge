/**
 * ICS-201 Incident Action Plan (IAP) Document Generator
 * Outputs FEMA ICS-201 standardized incident briefing sheets
 * with timestamps, command hierarchy, zone statuses, and operational period directives.
 */

import type { IncidentState } from '../types/incident';

export function generateICS201Markdown(incident: IncidentState): string {
  const dateStr = new Date().toISOString().replace('T', ' ').substring(0, 19);

  return `
# ICS-201 INCIDENT BRIEFING & ACTION PLAN (IAP)
**CrisisBridge Tactical Operations Center**
--------------------------------------------------------------------------------
**1. INCIDENT NAME:** ${incident.codeName} (${incident.verticalTitle})  
**2. INCIDENT ID:** ${incident.id}  
**3. DATE/TIME INITIATED:** ${incident.startTime}  
**4. CURRENT STATUS TIME:** ${dateStr} UTC  
**5. INCIDENT COMMANDER:** ${incident.incidentCommander}  
**6. OPERATIONAL PERIOD:** ${incident.operationalPeriod}  
**7. THREAT LEVEL:** ${incident.severity}  

--------------------------------------------------------------------------------
## 8. INITIAL SITUATION SUMMARY
> "${incident.originalSituation}"

${incident.latestUpdatePrompt ? `\n### LATEST DELTA INJECTION\n> "${incident.latestUpdatePrompt}"\n` : ''}

--------------------------------------------------------------------------------
## 9. CURRENT OBJECTIVES & DIRECTIVES (NOW — IMMEDIATE 0-2 MIN)
${incident.nowActions.map((act, i) => `
- **[ACT-${i + 1}] ${act.title}**
  - **Status:** [${act.status}] | **Urgency:** ${act.urgency} | **Assignee:** ${act.assignee}
  - **Zone:** ${act.zoneId || 'All Zones'} | **Est Duration:** ${act.estimatedMinutes} mins
  - **Directive:** ${act.description}
  - **Governing Protocol:** ${act.explainability.governingPolicy}
  - **Why:** ${act.explainability.rationale}
`).join('\n')}

--------------------------------------------------------------------------------
## 10. NEAR-TERM TACTICAL ACTIONS (NEXT 10 MINUTES)
${incident.next10MinActions.map((act, i) => `
- **[NEXT-${i + 1}] ${act.title}**
  - **Status:** [${act.status}] | **Assignee:** ${act.assignee}
  - **Directive:** ${act.description}
  - **Risk Factor:** ${act.explainability.triggerFactor}
`).join('\n')}

--------------------------------------------------------------------------------
## 11. CONTINUOUS TELEMETRY MONITORS
| Metric ID | Parameter | Value | Status | Trend | Threshold Limit |
|---|---|---|---|---|---|
${incident.monitorMetrics.map(m => `| ${m.id} | ${m.name} | **${m.value}** | ${m.status} | ${m.trend} | ${m.targetThreshold} |`).join('\n')}

--------------------------------------------------------------------------------
## 12. DETERMINISTIC ESCALATION MATRIX (ESCALATE WHEN)
${incident.escalateConditions.map((esc, i) => `
${i + 1}. **Trigger Condition:** \`${esc.condition}\`
   - **Breach State:** ${esc.isTriggered ? '🚨 ACTIVE BREACH' : '🛡️ MONITORING'}
   - **Observed:** ${esc.currentObserved} (Limit: ${esc.thresholdValue})
   - **Escalation Protocol:** ${esc.consequence}
   - **Target Lead:** ${esc.targetRole}
`).join('\n')}

--------------------------------------------------------------------------------
## 13. SECTOR TOPOLOGY & RESOURCE ALLOCATION
${incident.zones.map(z => `
- **${z.name} [${z.id}]** — Status: **${z.status}** (${z.capacityPct}% capacity)
  - Units Deployed: ${z.unitsDeployed}
  - Interconnections: ${z.connections.join(', ')}
  ${z.hazardNote ? `- Hazard Alert: ${z.hazardNote}` : ''}
`).join('\n')}

--------------------------------------------------------------------------------
## 14. EXPLAINABILITY & AUDIT TRAIL
${incident.auditTrail.map(a => `[${a.timestamp}] [${a.type}] [${a.actor}] ${a.message}`).join('\n')}

--------------------------------------------------------------------------------
*Generated automatically by CrisisBridge AI Incident Commander engine. State Hash v${incident.stateVersion}.*
`.trim();
}

export function downloadFile(content: string, filename: string, mimeType: string = 'text/markdown') {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
