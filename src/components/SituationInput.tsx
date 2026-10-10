/**
 * CrisisBridge Situation Input & Chaos Injector
 * 
 * Allows users to input chaotic situations, test multi-vertical presets,
 * and execute mid-crisis disruption injections ("Situation Changed").
 */

import React, { useState } from 'react';
import { Send, Zap, Flame, AlertOctagon } from 'lucide-react';
import { PRESET_SCENARIOS, type ScenarioPreset } from '../data/defaultScenarios';
import type { VerticalType } from '../types/incident';

interface SituationInputProps {
  currentVertical: VerticalType;
  currentSituationText: string;
  onApplyNewSituation: (text: string) => void;
  onInjectFailure: (failureText: string) => void;
}

export const SituationInput: React.FC<SituationInputProps> = ({
  currentVertical,
  currentSituationText,
  onApplyNewSituation,
  onInjectFailure
}) => {
  const [inputText, setInputText] = useState(currentSituationText);
  const [customChaosText, setCustomChaosText] = useState('');
  const [showChaosPrompt, setShowChaosPrompt] = useState(false);

  const preset: ScenarioPreset = PRESET_SCENARIOS[currentVertical];

  const handleApply = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputText.trim()) {
      onApplyNewSituation(inputText.trim());
    }
  };

  const handleCustomChaosSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (customChaosText.trim()) {
      onInjectFailure(customChaosText.trim());
      setCustomChaosText('');
      setShowChaosPrompt(false);
    }
  };

  return (
    <section aria-label="Incident Chaos Console" className="tactical-card situation-input-card" style={{ padding: '18px 20px', marginBottom: 20 }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12, flexWrap: 'wrap', gap: 10 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <span className="badge-tactical badge-critical font-mono" style={{ fontSize: '0.74rem' }}>
            CHAOS INGESTION FEED
          </span>
          <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
            Raw Situational Telemetry & Unstructured Dispatch
          </span>
        </div>

        {/* Chaos Injection Action Trigger */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
            DEMO KILLER FEATURE:
          </span>
          <button
            onClick={() => setShowChaosPrompt(!showChaosPrompt)}
            className="btn-tactical btn-danger"
            style={{ fontSize: '0.8rem', padding: '6px 14px' }}
            title="Inject real-time failure to trigger 'Situation Changed' Delta Mode"
          >
            <Flame size={15} />
            <span>INJECT FAILURE / CHAOS</span>
          </button>
        </div>
      </div>

      {/* Main Situation Input Box */}
      <form onSubmit={handleApply} style={{ marginBottom: 14 }}>
        <div style={{ position: 'relative' }}>
          <textarea
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            rows={2}
            placeholder="Describe any chaotic situation (e.g. 'Our college event starts in 30 minutes. Gate 2 is crowded...')"
            style={{
              width: '100%',
              background: 'rgba(5, 8, 16, 0.75)',
              border: '1px solid var(--border-glow)',
              borderRadius: 'var(--radius-sm)',
              padding: '12px 110px 12px 14px',
              color: 'var(--text-primary)',
              fontSize: '0.92rem',
              fontFamily: 'var(--font-sans)',
              lineHeight: 1.45,
              resize: 'vertical',
              outline: 'none'
            }}
          />
          <button
            type="submit"
            className="btn-tactical btn-primary"
            style={{
              position: 'absolute',
              right: 10,
              top: 10,
              padding: '8px 14px',
              fontSize: '0.82rem'
            }}
          >
            <Send size={14} />
            <span>PARSE</span>
          </button>
        </div>
      </form>

      {/* Quick Chaos Failure Injection Chips */}
      <div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
          <Zap size={14} color="var(--status-amber)" />
          <span style={{ fontSize: '0.76rem', color: 'var(--text-secondary)', fontWeight: 600 }}>
            QUICK DISRUPTIONS (Click to test agent state adaptability):
          </span>
        </div>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          {preset.chaosInjectionQuickPicks.map((pick, idx) => (
            <button
              key={idx}
              onClick={() => onInjectFailure(pick.text)}
              className="btn-tactical btn-secondary"
              style={{
                fontSize: '0.78rem',
                padding: '5px 12px',
                border: '1px solid rgba(245, 158, 11, 0.35)',
                background: 'rgba(245, 158, 11, 0.06)'
              }}
              title={pick.description}
            >
              <span>{pick.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Custom Chaos Injection Expanded Drawer */}
      {showChaosPrompt && (
        <form
          onSubmit={handleCustomChaosSubmit}
          style={{
            marginTop: 14,
            padding: '14px 16px',
            background: 'rgba(239, 68, 68, 0.08)',
            border: '1px solid var(--border-crimson-glow)',
            borderRadius: 'var(--radius-sm)'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
            <AlertOctagon size={16} color="#ef4444" />
            <span style={{ fontSize: '0.84rem', fontWeight: 700, color: '#fca5a5' }}>
              Mid-Crisis Failure Injection Simulator
            </span>
          </div>
          <p style={{ margin: '0 0 10px 0', fontSize: '0.78rem', color: 'var(--text-secondary)' }}>
            Introduce any unexpected incident constraint (e.g. &quot;Gate 3 is now blocked&quot;, &quot;Power grid failure&quot;, &quot;Ambulance driver stuck in traffic&quot;).
            The system will demonstrate stateful delta planning instead of starting from scratch.
          </p>
          <div style={{ display: 'flex', gap: 10 }}>
            <input
              type="text"
              value={customChaosText}
              onChange={(e) => setCustomChaosText(e.target.value)}
              placeholder="Type unexpected constraint: e.g. 'Gate 3 is now blocked by falling scaffolding.'"
              style={{
                flex: 1,
                background: 'rgba(5, 8, 16, 0.9)',
                border: '1px solid rgba(239, 68, 68, 0.4)',
                borderRadius: 'var(--radius-sm)',
                padding: '8px 12px',
                color: 'var(--text-primary)',
                fontSize: '0.85rem',
                outline: 'none'
              }}
            />
            <button
              type="submit"
              className="btn-tactical btn-danger"
              style={{ fontSize: '0.82rem', padding: '8px 16px' }}
            >
              TRIGGER SITUATION CHANGED
            </button>
          </div>
        </form>
      )}
    </section>
  );
};
