/**
 * CrisisBridge State Machine HUD
 * Visualizes the agentic state graph:
 * Situation → State → Decision → Action → New State → Decision
 */

import React from 'react';
import { ArrowRight, Cpu, Layers, CheckCircle, RefreshCw, Zap } from 'lucide-react';
import type { StateNode } from '../types/incident';

interface StateGraphHUDProps {
  stateGraph: StateNode[];
  stateVersion: number;
}

export const StateGraphHUD: React.FC<StateGraphHUDProps> = ({ stateGraph, stateVersion }) => {
  const getStepIcon = (step: StateNode['step']) => {
    switch (step) {
      case 'SITUATION':
        return <Layers size={14} />;
      case 'STATE':
        return <Cpu size={14} />;
      case 'DECISION':
        return <Zap size={14} />;
      case 'ACTION':
        return <RefreshCw size={14} className="spin-slow" />;
      case 'NEW_STATE':
        return <CheckCircle size={14} />;
    }
  };

  const getStepColor = (step: StateNode['step'], active: boolean) => {
    if (active) return 'var(--accent-cyan)';
    switch (step) {
      case 'SITUATION':
        return 'var(--status-amber)';
      case 'STATE':
        return 'var(--accent-blue)';
      case 'DECISION':
        return 'var(--status-purple)';
      case 'ACTION':
        return 'var(--status-emerald)';
      case 'NEW_STATE':
        return 'var(--accent-cyan)';
    }
  };

  return (
    <section
      aria-label="Agent State Machine Lifecycle"
      className="tactical-card"
      style={{
        padding: '14px 20px',
        marginBottom: 20,
        background: 'linear-gradient(180deg, rgba(13, 20, 36, 0.85) 0%, rgba(15, 23, 42, 0.6) 100%)',
        border: '1px solid rgba(0, 240, 255, 0.2)'
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12, flexWrap: 'wrap', gap: 10 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <span className="badge-tactical badge-medium font-mono" style={{ fontSize: '0.72rem' }}>
            AGENTIC STATE MACHINE
          </span>
          <span style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
            Continuous State Transition Loop
          </span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <span className="font-mono text-cyan" style={{ fontSize: '0.75rem', fontWeight: 600 }}>
            STATE GRAPH v{stateVersion}.0 • REACTIVE DELTA READY
          </span>
          <span
            style={{
              fontSize: '0.72rem',
              color: 'var(--text-muted)',
              background: 'rgba(255, 255, 255, 0.04)',
              padding: '2px 8px',
              borderRadius: 4
            }}
          >
            Not a static chatbot — Stateful Incident Commander
          </span>
        </div>
      </div>

      {/* 5-Step Horizontal Flow Diagram */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(5, 1fr)',
          gap: 12,
          position: 'relative'
        }}
      >
        {stateGraph.map((node, index) => {
          const isActive = node.active;
          const color = getStepColor(node.step, isActive);

          return (
            <div
              key={node.step}
              style={{
                position: 'relative',
                background: isActive ? 'rgba(0, 240, 255, 0.08)' : 'rgba(255, 255, 255, 0.02)',
                border: `1px solid ${isActive ? 'var(--accent-cyan)' : 'var(--border-subtle)'}`,
                boxShadow: isActive ? '0 0 15px rgba(0, 240, 255, 0.25)' : 'none',
                borderRadius: 'var(--radius-sm)',
                padding: '10px 12px',
                transition: 'all 0.2s ease-in-out'
              }}
            >
              {/* Connector Arrow */}
              {index < stateGraph.length - 1 && (
                <div
                  style={{
                    position: 'absolute',
                    right: -10,
                    top: '50%',
                    transform: 'translateY(-50%)',
                    zIndex: 2,
                    color: isActive ? 'var(--accent-cyan)' : 'var(--text-muted)',
                    background: 'var(--bg-primary)',
                    borderRadius: '50%',
                    width: 18,
                    height: 18,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    border: '1px solid var(--border-subtle)'
                  }}
                >
                  <ArrowRight size={10} />
                </div>
              )}

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 4 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <span style={{ color }}>{getStepIcon(node.step)}</span>
                  <span
                    className="font-mono"
                    style={{
                      fontSize: '0.78rem',
                      fontWeight: 700,
                      color: isActive ? 'var(--accent-cyan)' : 'var(--text-primary)'
                    }}
                  >
                    {node.step}
                  </span>
                </div>
                {isActive && (
                  <span className="badge-tactical badge-new-urgent" style={{ fontSize: '0.62rem', padding: '1px 5px' }}>
                    ACTIVE
                  </span>
                )}
              </div>

              <p
                style={{
                  fontSize: '0.72rem',
                  color: isActive ? 'var(--text-primary)' : 'var(--text-muted)',
                  lineHeight: 1.35,
                  margin: 0
                }}
              >
                {node.description}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
};
