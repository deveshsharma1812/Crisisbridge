/**
 * CrisisBridge Action Card Component
 * Represents a single operational directive with live status toggling,
 * assignee info, delta tags, and explainability audit links.
 */

import React from 'react';
import { CheckCircle2, Clock, HelpCircle, User } from 'lucide-react';
import type { ActionItem } from '../types/incident';

interface ActionCardProps {
  action: ActionItem;
  onToggleStatus: (actionId: string, nextStatus: ActionItem['status']) => void;
  onInspectExplainability: (action: ActionItem) => void;
}

export const ActionCard: React.FC<ActionCardProps> = ({
  action,
  onToggleStatus,
  onInspectExplainability
}) => {
  const isSuperseded = action.deltaType === 'SUPERSEDED';
  const isNewUrgent = action.deltaType === 'NEW_URGENT';
  const isCompleted = action.status === 'COMPLETED';

  const getStatusButton = () => {
    if (isSuperseded) {
      return (
        <span className="badge-tactical badge-superseded">
          REVOKED / ABORT
        </span>
      );
    }

    if (isCompleted) {
      return (
        <button
          onClick={() => onToggleStatus(action.id, 'IN_PROGRESS')}
          className="btn-tactical"
          style={{
            background: 'rgba(16, 185, 129, 0.2)',
            color: 'var(--status-emerald)',
            border: '1px solid var(--status-emerald)',
            fontSize: '0.74rem',
            padding: '3px 8px'
          }}
          title="Click to mark as In Progress"
        >
          <CheckCircle2 size={13} />
          <span>DONE</span>
        </button>
      );
    }

    if (action.status === 'IN_PROGRESS') {
      return (
        <button
          onClick={() => onToggleStatus(action.id, 'COMPLETED')}
          className="btn-tactical btn-outline-cyan"
          style={{ fontSize: '0.74rem', padding: '3px 8px' }}
          title="Click to mark as Completed"
        >
          <Clock size={13} className="spin-slow" />
          <span>IN PROGRESS</span>
        </button>
      );
    }

    return (
      <button
        onClick={() => onToggleStatus(action.id, 'IN_PROGRESS')}
        className="btn-tactical btn-secondary"
        style={{ fontSize: '0.74rem', padding: '3px 8px' }}
        title="Click to dispatch"
      >
        <span>STANDBY</span>
      </button>
    );
  };

  return (
    <article
      aria-labelledby={`action-title-${action.id}`}
      style={{
        background: isSuperseded
          ? 'rgba(239, 68, 68, 0.06)'
          : isNewUrgent
          ? 'rgba(0, 240, 255, 0.06)'
          : 'rgba(255, 255, 255, 0.03)',
        border: `1px solid ${
          isSuperseded
            ? 'rgba(239, 68, 68, 0.35)'
            : isNewUrgent
            ? 'var(--accent-cyan)'
            : 'var(--border-subtle)'
        }`,
        borderRadius: 'var(--radius-sm)',
        padding: '12px 14px',
        marginBottom: 10,
        position: 'relative',
        opacity: isSuperseded ? 0.7 : 1,
        transition: 'all 0.15s ease'
      }}
    >
      {/* Top Header: Delta Tag or Category */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 6 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          {isNewUrgent && (
            <span className="badge-tactical badge-new-urgent">
              🚨 NEW URGENT
            </span>
          )}
          {isSuperseded && (
            <span className="badge-tactical badge-superseded">
              SUPERSEDED
            </span>
          )}
          <span
            className="font-mono text-muted"
            style={{ fontSize: '0.68rem' }}
          >
            {action.id}
          </span>
        </div>

        {getStatusButton()}
      </div>

      {/* Action Title */}
      <h3
        id={`action-title-${action.id}`}
        style={{
          fontSize: '0.9rem',
          fontWeight: 700,
          color: isSuperseded ? '#fca5a5' : 'var(--text-primary)',
          textDecoration: isSuperseded ? 'line-through' : 'none',
          marginBottom: 6,
          lineHeight: 1.35
        }}
      >
        {action.title}
      </h3>

      {/* Description */}
      <p
        style={{
          fontSize: '0.78rem',
          color: 'var(--text-secondary)',
          lineHeight: 1.45,
          marginBottom: 10
        }}
      >
        {action.description}
      </p>

      {/* Reason if Superseded */}
      {isSuperseded && action.deltaReason && (
        <div
          style={{
            background: 'rgba(239, 68, 68, 0.15)',
            border: '1px solid rgba(239, 68, 68, 0.3)',
            borderRadius: 4,
            padding: '6px 8px',
            fontSize: '0.72rem',
            color: '#fca5a5',
            marginBottom: 8
          }}
        >
          <strong>Reason Revoked:</strong> {action.deltaReason}
        </div>
      )}

      {/* Metadata: Assignee & Zone */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: 6,
          fontSize: '0.72rem',
          color: 'var(--text-muted)',
          paddingTop: 8,
          borderTop: '1px solid rgba(255, 255, 255, 0.05)'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
          <User size={12} color="var(--accent-blue)" />
          <span style={{ color: 'var(--text-secondary)' }}>{action.assignee}</span>
        </div>

        <button
          onClick={() => onInspectExplainability(action)}
          className="btn-tactical btn-secondary"
          style={{
            fontSize: '0.7rem',
            padding: '2px 8px',
            border: '1px solid rgba(0, 240, 255, 0.3)',
            color: 'var(--accent-cyan)'
          }}
          title="Inspect AI Decision Rationale, Governing Policy & Trade-offs"
        >
          <HelpCircle size={11} />
          <span>EXPLAIN WHY</span>
        </button>
      </div>
    </article>
  );
};
