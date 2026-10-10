/**
 * CrisisBridge 4-Pillar Action Board
 * Directly models the core incident command structure:
 * 1. NOW (0-2m Immediate Actions)
 * 2. NEXT 10 MINUTES (Near-term stabilization)
 * 3. MONITOR (Real-time telemetry gauges)
 * 4. ESCALATE WHEN (Deterministic trigger rules)
 */

import React from 'react';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import type { ActionItem, MonitorMetric, EscalateCondition } from '../types/incident';
import { ActionCard } from './ActionCard';

interface ActionBoardProps {
  nowActions: ActionItem[];
  next10MinActions: ActionItem[];
  monitorMetrics: MonitorMetric[];
  escalateConditions: EscalateCondition[];
  onToggleActionStatus: (actionId: string, nextStatus: ActionItem['status']) => void;
  onInspectExplainability: (action: ActionItem) => void;
}

export const ActionBoard: React.FC<ActionBoardProps> = ({
  nowActions,
  next10MinActions,
  monitorMetrics,
  escalateConditions,
  onToggleActionStatus,
  onInspectExplainability
}) => {
  return (
    <main aria-label="Tactical Action Board" className="action-board-grid">
      {/* -------------------------------------------------------------
          PILLAR 1: NOW (Immediate 0-2 min life safety directives)
         ------------------------------------------------------------- */}
      <section
        aria-labelledby="pillar-now-heading"
        className="tactical-card"
        style={{
          borderTop: '3px solid var(--status-crimson)',
          padding: '16px 14px'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span
              style={{
                width: 24,
                height: 24,
                borderRadius: '50%',
                background: 'rgba(239, 68, 68, 0.2)',
                color: '#ef4444',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 800,
                fontSize: '0.75rem'
              }}
            >
              1
            </span>
            <div>
              <h2 id="pillar-now-heading" style={{ fontSize: '0.98rem', fontWeight: 800, letterSpacing: '0.04em', margin: 0, color: 'var(--text-primary)' }}>
                NOW
              </h2>
              <span className="font-mono text-crimson" style={{ fontSize: '0.68rem', fontWeight: 600 }}>
                IMMEDIATE (0-2 MIN)
              </span>
            </div>
          </div>
          <span className="badge-tactical badge-critical" style={{ fontSize: '0.68rem' }}>
            {nowActions.filter(a => a.status === 'COMPLETED').length}/{nowActions.length} COMPLETED
          </span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          {nowActions.map(action => (
            <ActionCard
              key={action.id}
              action={action}
              onToggleStatus={onToggleActionStatus}
              onInspectExplainability={onInspectExplainability}
            />
          ))}
        </div>
      </section>

      {/* -------------------------------------------------------------
          PILLAR 2: NEXT 10 MINUTES (Stabilization & rerouting)
         ------------------------------------------------------------- */}
      <section
        aria-labelledby="pillar-next-heading"
        className="tactical-card"
        style={{
          borderTop: '3px solid var(--accent-blue)',
          padding: '16px 14px'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span
              style={{
                width: 24,
                height: 24,
                borderRadius: '50%',
                background: 'rgba(56, 189, 248, 0.2)',
                color: 'var(--accent-blue)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 800,
                fontSize: '0.75rem'
              }}
            >
              2
            </span>
            <div>
              <h2 id="pillar-next-heading" style={{ fontSize: '0.98rem', fontWeight: 800, letterSpacing: '0.04em', margin: 0, color: 'var(--text-primary)' }}>
                NEXT 10 MINUTES
              </h2>
              <span className="font-mono text-cyan" style={{ fontSize: '0.68rem', fontWeight: 600 }}>
                STABILIZATION PHASE
              </span>
            </div>
          </div>
          <span className="badge-tactical badge-medium" style={{ fontSize: '0.68rem' }}>
            {next10MinActions.length} DIRECTIVES
          </span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          {next10MinActions.map(action => (
            <ActionCard
              key={action.id}
              action={action}
              onToggleStatus={onToggleActionStatus}
              onInspectExplainability={onInspectExplainability}
            />
          ))}
        </div>
      </section>

      {/* -------------------------------------------------------------
          PILLAR 3: MONITOR (Real-time telemetry gauges)
         ------------------------------------------------------------- */}
      <section
        aria-labelledby="pillar-monitor-heading"
        className="tactical-card"
        style={{
          borderTop: '3px solid var(--status-amber)',
          padding: '16px 14px'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span
              style={{
                width: 24,
                height: 24,
                borderRadius: '50%',
                background: 'rgba(245, 158, 11, 0.2)',
                color: 'var(--status-amber)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 800,
                fontSize: '0.75rem'
              }}
            >
              3
            </span>
            <div>
              <h2 id="pillar-monitor-heading" style={{ fontSize: '0.98rem', fontWeight: 800, letterSpacing: '0.04em', margin: 0, color: 'var(--text-primary)' }}>
                MONITOR
              </h2>
              <span className="font-mono text-amber" style={{ fontSize: '0.68rem', fontWeight: 600 }}>
                ACTIVE TELEMETRY
              </span>
            </div>
          </div>
          <span className="badge-tactical badge-high" style={{ fontSize: '0.68rem' }}>
            LIVE FEEDS
          </span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {monitorMetrics.map(metric => {
            const isWarn = metric.status === 'WARNING';
            const isCrit = metric.status === 'CRITICAL';

            return (
              <div
                key={metric.id}
                style={{
                  background: 'rgba(255, 255, 255, 0.03)',
                  border: `1px solid ${
                    isCrit
                      ? 'rgba(239, 68, 68, 0.4)'
                      : isWarn
                      ? 'rgba(245, 158, 11, 0.35)'
                      : 'var(--border-subtle)'
                  }`,
                  borderRadius: 'var(--radius-sm)',
                  padding: '12px 14px'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 4 }}>
                  <span style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-primary)' }}>
                    {metric.name}
                  </span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: '0.72rem' }}>
                    {metric.trend === 'UP' && <TrendingUp size={13} color={isCrit ? '#ef4444' : '#f59e0b'} />}
                    {metric.trend === 'DOWN' && <TrendingDown size={13} color="var(--accent-blue)" />}
                    {metric.trend === 'STABLE' && <Minus size={13} color="var(--text-muted)" />}
                    <span className="font-mono text-muted">{metric.trend}</span>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 6 }}>
                  <span
                    className="font-mono"
                    style={{
                      fontSize: '1.25rem',
                      fontWeight: 800,
                      color: isCrit ? '#ef4444' : isWarn ? '#f59e0b' : 'var(--accent-cyan)'
                    }}
                  >
                    {metric.value}
                  </span>
                  <span className="font-mono" style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>
                    Limit: {metric.targetThreshold}
                  </span>
                </div>

                {/* Mini Visual Gauge Bar */}
                <div
                  style={{
                    height: 5,
                    width: '100%',
                    background: 'rgba(255, 255, 255, 0.06)',
                    borderRadius: 3,
                    overflow: 'hidden'
                  }}
                >
                  <div
                    style={{
                      height: '100%',
                      width: `${Math.min(100, Math.max(10, metric.numericValue))}%`,
                      background: isCrit
                        ? 'linear-gradient(90deg, #f59e0b, #ef4444)'
                        : isWarn
                        ? 'linear-gradient(90deg, #00f0ff, #f59e0b)'
                        : 'var(--status-emerald)',
                      borderRadius: 3,
                      transition: 'width 0.4s ease'
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* -------------------------------------------------------------
          PILLAR 4: ESCALATE WHEN (Deterministic trigger rules)
         ------------------------------------------------------------- */}
      <section
        aria-labelledby="pillar-escalate-heading"
        className="tactical-card"
        style={{
          borderTop: '3px solid var(--status-purple)',
          padding: '16px 14px'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span
              style={{
                width: 24,
                height: 24,
                borderRadius: '50%',
                background: 'rgba(168, 85, 247, 0.2)',
                color: 'var(--status-purple)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 800,
                fontSize: '0.75rem'
              }}
            >
              4
            </span>
            <div>
              <h2 id="pillar-escalate-heading" style={{ fontSize: '0.98rem', fontWeight: 800, letterSpacing: '0.04em', margin: 0, color: 'var(--text-primary)' }}>
                ESCALATE WHEN
              </h2>
              <span className="font-mono" style={{ fontSize: '0.68rem', fontWeight: 600, color: 'var(--status-purple)' }}>
                BREACH THRESHOLDS
              </span>
            </div>
          </div>
          <span className="badge-tactical font-mono" style={{ fontSize: '0.68rem', background: 'rgba(168, 85, 247, 0.2)', color: '#d8b4fe' }}>
            AUTO-TRIGGERS
          </span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {escalateConditions.map((esc, i) => (
            <div
              key={esc.id}
              style={{
                background: esc.isTriggered ? 'rgba(239, 68, 68, 0.12)' : 'rgba(255, 255, 255, 0.03)',
                border: `1px solid ${esc.isTriggered ? 'var(--status-crimson)' : 'var(--border-subtle)'}`,
                boxShadow: esc.isTriggered ? '0 0 12px rgba(239, 68, 68, 0.25)' : 'none',
                borderRadius: 'var(--radius-sm)',
                padding: '12px 14px'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 6 }}>
                <span className="font-mono text-muted" style={{ fontSize: '0.68rem' }}>
                  RULE #{i + 1}
                </span>
                {esc.isTriggered ? (
                  <span className="badge-tactical badge-critical pulse-beacon-crimson" style={{ fontSize: '0.65rem' }}>
                    🚨 ACTIVE BREACH
                  </span>
                ) : (
                  <span className="badge-tactical badge-sustained" style={{ fontSize: '0.65rem' }}>
                    🛡️ WATCHING
                  </span>
                )}
              </div>

              {/* Condition */}
              <div
                className="font-mono"
                style={{
                  fontSize: '0.82rem',
                  fontWeight: 700,
                  color: esc.isTriggered ? '#fca5a5' : 'var(--text-primary)',
                  marginBottom: 6,
                  lineHeight: 1.35
                }}
              >
                if: {esc.condition}
              </div>

              {/* Consequence Protocol */}
              <p style={{ margin: '0 0 8px 0', fontSize: '0.74rem', color: 'var(--text-secondary)', lineHeight: 1.4 }}>
                <strong>Then:</strong> {esc.consequence}
              </p>

              {/* Target Commanding Lead */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  paddingTop: 6,
                  borderTop: '1px solid rgba(255, 255, 255, 0.05)',
                  fontSize: '0.7rem',
                  color: 'var(--text-muted)'
                }}
              >
                <span>Notify Lead: <strong style={{ color: 'var(--text-primary)' }}>{esc.targetRole}</strong></span>
                <span className="font-mono" style={{ color: esc.isTriggered ? '#ef4444' : 'var(--accent-cyan)' }}>
                  Observed: {esc.currentObserved}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
};
