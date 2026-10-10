/**
 * CrisisBridge Explainability Ledger Modal
 * 
 * Provides deep transparent auditability for incident decisions:
 * - Trigger Factor (What prompted this action?)
 * - Governing Doctrine (FEMA/ICS safety policy standard)
 * - Rationale (Why this intervention?)
 * - Trade-off Analysis (What alternative actions were evaluated and rejected?)
 */

import React from 'react';
import { X, HelpCircle, Shield, AlertTriangle, CheckCircle, Scale } from 'lucide-react';
import type { ActionItem } from '../types/incident';

interface ExplainabilityModalProps {
  action: ActionItem | null;
  onClose: () => void;
}

export const ExplainabilityModal: React.FC<ExplainabilityModalProps> = ({ action, onClose }) => {
  if (!action) return null;

  return (
    <div className="modal-overlay" onClick={onClose} role="dialog" aria-modal="true" aria-labelledby="modal-explain-title">
      <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ padding: '24px 28px' }}>
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 16 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div
              style={{
                width: 36,
                height: 36,
                borderRadius: 'var(--radius-sm)',
                background: 'rgba(0, 240, 255, 0.15)',
                border: '1px solid var(--accent-cyan)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <HelpCircle size={20} color="var(--accent-cyan)" />
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span className="badge-tactical badge-medium font-mono" style={{ fontSize: '0.68rem' }}>
                  DECISION EXPLAINABILITY AUDIT
                </span>
                <span className="font-mono text-muted" style={{ fontSize: '0.72rem' }}>
                  ID: {action.id}
                </span>
              </div>
              <h2 id="modal-explain-title" style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--text-primary)', margin: '4px 0 0 0' }}>
                {action.title}
              </h2>
            </div>
          </div>

          <button
            onClick={onClose}
            className="btn-tactical btn-secondary"
            style={{ padding: '6px' }}
            aria-label="Close explainability modal"
          >
            <X size={18} />
          </button>
        </div>

        {/* Explainability Breakdown Cards */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          {/* 1. Trigger Factor */}
          <div
            style={{
              background: 'rgba(245, 158, 11, 0.08)',
              border: '1px solid rgba(245, 158, 11, 0.3)',
              borderRadius: 'var(--radius-sm)',
              padding: '12px 16px'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 4 }}>
              <AlertTriangle size={15} color="var(--status-amber)" />
              <strong className="font-mono text-amber" style={{ fontSize: '0.78rem' }}>
                TRIGGERING SITUATIONAL FACTOR
              </strong>
            </div>
            <p style={{ margin: 0, fontSize: '0.86rem', color: 'var(--text-primary)' }}>
              {action.explainability.triggerFactor}
            </p>
          </div>

          {/* 2. Governing Safety Standard */}
          <div
            style={{
              background: 'rgba(56, 189, 248, 0.08)',
              border: '1px solid rgba(56, 189, 248, 0.3)',
              borderRadius: 'var(--radius-sm)',
              padding: '12px 16px'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 4 }}>
              <Shield size={15} color="var(--accent-blue)" />
              <strong className="font-mono text-cyan" style={{ fontSize: '0.78rem' }}>
                GOVERNING EMERGENCY DOCTRINE / PROTOCOL
              </strong>
            </div>
            <p style={{ margin: 0, fontSize: '0.86rem', color: 'var(--text-primary)' }}>
              {action.explainability.governingPolicy}
            </p>
          </div>

          {/* 3. Core Operational Rationale */}
          <div
            style={{
              background: 'rgba(16, 185, 129, 0.08)',
              border: '1px solid rgba(16, 185, 129, 0.3)',
              borderRadius: 'var(--radius-sm)',
              padding: '12px 16px'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 4 }}>
              <CheckCircle size={15} color="var(--status-emerald)" />
              <strong className="font-mono text-emerald" style={{ fontSize: '0.78rem' }}>
                WHY THIS INTERVENTION WAS SELECTED
              </strong>
            </div>
            <p style={{ margin: 0, fontSize: '0.86rem', color: 'var(--text-primary)' }}>
              {action.explainability.rationale}
            </p>
          </div>

          {/* 4. Trade-offs Rejected */}
          <div
            style={{
              background: 'rgba(255, 255, 255, 0.03)',
              border: '1px solid var(--border-subtle)',
              borderRadius: 'var(--radius-sm)',
              padding: '12px 16px'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 8 }}>
              <Scale size={15} color="var(--text-secondary)" />
              <strong className="font-mono" style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>
                TRADE-OFFS & REJECTED ALTERNATIVES
              </strong>
            </div>
            <ul style={{ margin: 0, paddingLeft: 20, fontSize: '0.82rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
              {action.explainability.tradeoffsRejected.map((item, idx) => (
                <li key={idx} style={{ marginBottom: 4 }}>
                  <span style={{ color: '#fca5a5' }}>Rejected:</span> {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Footer */}
        <div style={{ marginTop: 20, display: 'flex', justifyContent: 'flex-end' }}>
          <button onClick={onClose} className="btn-tactical btn-primary" style={{ padding: '8px 20px' }}>
            CLOSE AUDIT VIEW
          </button>
        </div>
      </div>
    </div>
  );
};
