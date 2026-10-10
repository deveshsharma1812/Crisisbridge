/**
 * CrisisBridge Delta Plan Banner
 * Killer Feature Component: Displays real-time delta diff when the situation changes
 */

import React from 'react';
import { AlertTriangle, CheckCircle2, XCircle, Zap, X } from 'lucide-react';
import type { DeltaReport } from '../types/incident';

interface DeltaPlanBannerProps {
  deltaReport?: DeltaReport;
  onDismiss: () => void;
}

export const DeltaPlanBanner: React.FC<DeltaPlanBannerProps> = ({ deltaReport, onDismiss }) => {
  if (!deltaReport) return null;

  return (
    <aside
      aria-label="Situation Changed Incident Delta"
      role="alert"
      className="tactical-card glow-crimson"
      style={{
        padding: '16px 20px',
        marginBottom: 20,
        background: 'linear-gradient(90deg, rgba(239, 68, 68, 0.12) 0%, rgba(13, 20, 36, 0.95) 100%)',
        border: '1px solid var(--border-crimson-glow)',
        borderRadius: 'var(--radius-md)'
      }}
    >
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 16 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div
            className="pulse-beacon-crimson"
            style={{
              width: 36,
              height: 36,
              borderRadius: 'var(--radius-sm)',
              background: 'rgba(239, 68, 68, 0.25)',
              border: '1px solid #ef4444',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0
            }}
          >
            <AlertTriangle size={20} color="#ef4444" />
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
              <span className="badge-tactical badge-critical" style={{ fontSize: '0.74rem' }}>
                🚨 SITUATION CHANGED
              </span>
              <span className="font-mono text-cyan" style={{ fontSize: '0.8rem', fontWeight: 600 }}>
                DELTA DIFF COMPUTED AT {deltaReport.timestamp}
              </span>
            </div>
            <p style={{ margin: '4px 0 0 0', fontSize: '0.92rem', color: 'var(--text-primary)', fontWeight: 600 }}>
              &quot;{deltaReport.newChaosFactor}&quot;
            </p>
          </div>
        </div>

        <button
          onClick={onDismiss}
          className="btn-tactical btn-secondary"
          style={{ padding: '4px 8px', fontSize: '0.75rem' }}
          aria-label="Dismiss delta alert"
        >
          <X size={14} />
          <span>ACKNOWLEDGE</span>
        </button>
      </div>

      {/* Delta Metrics Bar */}
      <div
        style={{
          marginTop: 14,
          paddingTop: 12,
          borderTop: '1px solid var(--border-subtle)',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: 12
        }}
      >
        {/* Superseded Action Count */}
        <div
          style={{
            background: 'rgba(239, 68, 68, 0.08)',
            border: '1px solid rgba(239, 68, 68, 0.3)',
            borderRadius: 'var(--radius-sm)',
            padding: '10px 12px'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 4 }}>
            <XCircle size={15} color="#ef4444" />
            <span className="font-mono" style={{ fontSize: '0.78rem', color: '#fca5a5', fontWeight: 700 }}>
              SUPERSEDED / ABORTED ({deltaReport.supersededActionIds.length})
            </span>
          </div>
          <p style={{ margin: 0, fontSize: '0.74rem', color: 'var(--text-secondary)' }}>
            Existing decisions identified as invalidated by the disruption and halted immediately.
          </p>
        </div>

        {/* New Urgent Actions */}
        <div
          style={{
            background: 'rgba(0, 240, 255, 0.08)',
            border: '1px solid rgba(0, 240, 255, 0.35)',
            borderRadius: 'var(--radius-sm)',
            padding: '10px 12px'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 4 }}>
            <Zap size={15} color="var(--accent-cyan)" />
            <span className="font-mono text-cyan" style={{ fontSize: '0.78rem', fontWeight: 700 }}>
              NEW EMERGENCY COUNTERMEASURES ({deltaReport.newActionsCount})
            </span>
          </div>
          <p style={{ margin: 0, fontSize: '0.74rem', color: 'var(--text-secondary)' }}>
            Fresh high-priority actions dispatched directly targeting the new constraint.
          </p>
        </div>

        {/* Sustained Actions */}
        <div
          style={{
            background: 'rgba(16, 185, 129, 0.08)',
            border: '1px solid rgba(16, 185, 129, 0.25)',
            borderRadius: 'var(--radius-sm)',
            padding: '10px 12px'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 4 }}>
            <CheckCircle2 size={15} color="var(--status-emerald)" />
            <span className="font-mono text-emerald" style={{ fontSize: '0.78rem', fontWeight: 700 }}>
              SUSTAINED DIRECTIVES ({deltaReport.sustainedActionsCount})
            </span>
          </div>
          <p style={{ margin: 0, fontSize: '0.74rem', color: 'var(--text-secondary)' }}>
            Ongoing operations validated as still safe and necessary; preserved without thrash.
          </p>
        </div>
      </div>

      {/* Critical Shift Explainer */}
      <div
        style={{
          marginTop: 10,
          background: 'rgba(0, 0, 0, 0.25)',
          padding: '8px 12px',
          borderRadius: 4,
          fontSize: '0.8rem',
          color: 'var(--text-primary)',
          display: 'flex',
          alignItems: 'center',
          gap: 8
        }}
      >
        <span className="text-cyan font-mono" style={{ fontWeight: 700 }}>EXPLANATION:</span>
        <span>{deltaReport.criticalShiftSummary}</span>
      </div>
    </aside>
  );
};
