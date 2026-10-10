/**
 * CrisisBridge — AI Incident Commander
 * Root Application Container
 */

import React, { useState, useEffect, useCallback } from 'react';
import { Navbar } from './components/Navbar';
import { StateGraphHUD } from './components/StateGraphHUD';
import { SituationInput } from './components/SituationInput';
import { DeltaPlanBanner } from './components/DeltaPlanBanner';
import { ActionBoard } from './components/ActionBoard';
import { ZoneMap } from './components/ZoneMap';
import { ExplainabilityModal } from './components/ExplainabilityModal';
import { ICSReportModal } from './components/ICSReportModal';
import { TestHarnessModal } from './components/TestHarnessModal';

import type { IncidentState, VerticalType, ActionItem } from './types/incident';
import { IncidentEngine } from './engine/incidentEngine';
import { computeIncidentDelta } from './engine/deltaDiff';
import { soundManager } from './utils/sound';

export const App: React.FC = () => {
  // Current active vertical and incident state
  const [vertical, setVertical] = useState<VerticalType>('CAMPUS_EVENT');
  const [incident, setIncident] = useState<IncidentState>(() =>
    IncidentEngine.loadPreset('CAMPUS_EVENT')
  );

  // Modals state
  const [inspectedAction, setInspectedAction] = useState<ActionItem | null>(null);
  const [showTestHarness, setShowTestHarness] = useState(false);
  const [showICSReport, setShowICSReport] = useState(false);

  // Handle vertical change
  const handleSelectVertical = useCallback((newVertical: VerticalType) => {
    setVertical(newVertical);
    const newPreset = IncidentEngine.loadPreset(newVertical);
    setIncident(newPreset);
    soundManager.playRadioChirp();
  }, []);

  // Handle parsing a newly entered chaotic situation
  const handleApplyNewSituation = useCallback((rawText: string) => {
    const freshState = IncidentEngine.parseChaosSituation(rawText);
    setIncident(freshState);
    soundManager.playRadioChirp();
  }, []);

  // Handle KILLER FEATURE: Situation Changed (Delta Injection)
  const handleInjectFailure = useCallback((failureText: string) => {
    const { updatedIncident } = computeIncidentDelta(incident, failureText);
    setIncident(updatedIncident);
    soundManager.playSituationChanged();
  }, [incident]);

  // Handle action status toggling (Pending -> In Progress -> Done)
  const handleToggleActionStatus = useCallback((actionId: string, nextStatus: ActionItem['status']) => {
    const updated = IncidentEngine.toggleActionStatus(incident, actionId, nextStatus);
    setIncident(updated);
    soundManager.playActionComplete();
  }, [incident]);

  // Keyboard navigation hotkeys for accessibility
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.altKey) {
        if (e.key === 't' || e.key === 'T') {
          e.preventDefault();
          setShowTestHarness(prev => !prev);
        } else if (e.key === 'r' || e.key === 'R') {
          e.preventDefault();
          setShowICSReport(prev => !prev);
        } else if (e.key === '1') {
          document.getElementById('pillar-now-heading')?.scrollIntoView({ behavior: 'smooth' });
        } else if (e.key === '2') {
          document.getElementById('pillar-next-heading')?.scrollIntoView({ behavior: 'smooth' });
        } else if (e.key === '3') {
          document.getElementById('pillar-monitor-heading')?.scrollIntoView({ behavior: 'smooth' });
        } else if (e.key === '4') {
          document.getElementById('pillar-escalate-heading')?.scrollIntoView({ behavior: 'smooth' });
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Tactical Top Bar */}
      <Navbar
        currentVertical={vertical}
        severity={incident.severity}
        codeName={incident.codeName}
        stateVersion={incident.stateVersion}
        onSelectVertical={handleSelectVertical}
        onOpenTests={() => setShowTestHarness(true)}
        onOpenReport={() => setShowICSReport(true)}
      />

      <div className="app-container" style={{ flex: 1 }}>
        {/* State Machine Transition Graph HUD */}
        <StateGraphHUD
          stateGraph={incident.stateGraph}
          stateVersion={incident.stateVersion}
        />

        {/* Delta Plan Flash Banner (Active when situation changes) */}
        <DeltaPlanBanner
          deltaReport={incident.deltaReport}
          onDismiss={() => setIncident(prev => ({ ...prev, deltaReport: undefined }))}
        />

        {/* Chaos Telemetry & Failure Injection Console */}
        <SituationInput
          key={vertical}
          currentVertical={vertical}
          currentSituationText={incident.originalSituation}
          onApplyNewSituation={handleApplyNewSituation}
          onInjectFailure={handleInjectFailure}
        />

        {/* 4-Pillar Incident Action Board */}
        <ActionBoard
          nowActions={incident.nowActions}
          next10MinActions={incident.next10MinActions}
          monitorMetrics={incident.monitorMetrics}
          escalateConditions={incident.escalateConditions}
          onToggleActionStatus={handleToggleActionStatus}
          onInspectExplainability={(act) => setInspectedAction(act)}
        />

        {/* Interactive Sector Topology & Choke Map */}
        <ZoneMap
          zones={incident.zones}
          isRaining={vertical === 'CAMPUS_EVENT' || vertical === 'URBAN_DISASTER'}
        />

        {/* Live Audit Trail Log */}
        <footer
          aria-label="Incident Audit Ledger"
          className="tactical-card"
          style={{
            marginTop: 20,
            padding: '14px 18px',
            background: 'rgba(5, 8, 16, 0.75)'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
            <span className="font-mono text-cyan" style={{ fontSize: '0.74rem', fontWeight: 700 }}>
              INCIDENT COMMAND DISPATCH LOG ({incident.auditTrail.length} RECORDS)
            </span>
            <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
              Keyboard Shortcuts: [Alt+1] NOW • [Alt+2] NEXT 10M • [Alt+3] MONITOR • [Alt+4] ESCALATE • [Alt+T] Tests • [Alt+R] Report
            </span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 4, maxHeight: 120, overflowY: 'auto' }}>
            {incident.auditTrail.slice(0, 6).map(entry => (
              <div
                key={entry.id}
                className="font-mono"
                style={{
                  fontSize: '0.72rem',
                  color: 'var(--text-secondary)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 10
                }}
              >
                <span style={{ color: 'var(--accent-cyan)' }}>[{entry.timestamp}]</span>
                <span className="badge-tactical" style={{ fontSize: '0.62rem', padding: '1px 5px' }}>{entry.type}</span>
                <span style={{ color: 'var(--text-primary)' }}>{entry.message}</span>
              </div>
            ))}
          </div>
        </footer>
      </div>

      {/* Decision Explainability Modal */}
      <ExplainabilityModal
        action={inspectedAction}
        onClose={() => setInspectedAction(null)}
      />

      {/* ICS-201 Official Report Modal */}
      {showICSReport && (
        <ICSReportModal
          incident={incident}
          onClose={() => setShowICSReport(false)}
        />
      )}

      {/* Automated Verification Test Suite Modal */}
      {showTestHarness && (
        <TestHarnessModal
          onClose={() => setShowTestHarness(false)}
        />
      )}
    </div>
  );
};

export default App;
