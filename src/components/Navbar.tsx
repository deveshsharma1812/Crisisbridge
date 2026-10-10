/**
 * CrisisBridge Tactical Navigation Bar
 * Features:
 * - Threat level pulse indicator
 * - Live UTC operational clock
 * - Preset vertical switcher
 * - Web Audio dispatch chime toggle
 * - Fast access to Test Suite, ICS-201 Report, and Theme
 */

import React, { useState, useEffect } from 'react';
import { ShieldAlert, Volume2, VolumeX, FileText, CheckCircle2, Sun, Moon, Activity } from 'lucide-react';
import type { VerticalType, SeverityLevel } from '../types/incident';
import { soundManager } from '../utils/sound';

interface NavbarProps {
  currentVertical: VerticalType;
  severity: SeverityLevel;
  codeName: string;
  stateVersion: number;
  onSelectVertical: (vertical: VerticalType) => void;
  onOpenTests: () => void;
  onOpenReport: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentVertical,
  severity,
  codeName,
  stateVersion,
  onSelectVertical,
  onOpenTests,
  onOpenReport
}) => {
  const [timeStr, setTimeStr] = useState<string>('');
  const [isMuted, setIsMuted] = useState<boolean>(soundManager.getMuted());
  const [isLightMode, setIsLightMode] = useState<boolean>(false);

  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      setTimeStr(now.toTimeString().slice(0, 8) + ' UTC');
    };
    updateClock();
    const interval = setInterval(updateClock, 1000);
    return () => clearInterval(interval);
  }, []);

  const toggleSound = () => {
    const next = !isMuted;
    setIsMuted(next);
    soundManager.setMuted(next);
    if (!next) {
      soundManager.playRadioChirp();
    }
  };

  const toggleTheme = () => {
    const next = !isLightMode;
    setIsLightMode(next);
    if (next) {
      document.body.classList.add('mode-light');
    } else {
      document.body.classList.remove('mode-light');
    }
  };

  const getSeverityBadge = () => {
    switch (severity) {
      case 'LEVEL_4_CRITICAL':
        return (
          <span className="badge-tactical badge-critical pulse-beacon-crimson" title="Threat Level 4 Critical">
            <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#ef4444', display: 'inline-block' }} />
            DEFCON 1 • CRITICAL
          </span>
        );
      case 'LEVEL_3_SEVERE':
        return (
          <span className="badge-tactical badge-critical" style={{ borderColor: '#f43f5e', background: 'rgba(244, 63, 94, 0.15)' }} title="Threat Level 3 Severe">
            <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#f43f5e', display: 'inline-block' }} />
            LVL 3 • SEVERE
          </span>
        );
      case 'LEVEL_2_ELEVATED':
        return (
          <span className="badge-tactical badge-high" title="Threat Level 2 Elevated">
            <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#f59e0b', display: 'inline-block' }} />
            LVL 2 • ELEVATED
          </span>
        );
      default:
        return (
          <span className="badge-tactical badge-sustained" title="Threat Level 1 Low">
            <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#10b981', display: 'inline-block' }} />
            LVL 1 • ROUTINE
          </span>
        );
    }
  };

  return (
    <header
      className="navbar-container"
      role="banner"
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 50,
        background: 'var(--bg-card)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        borderBottom: '1px solid var(--border-subtle)',
        padding: '0 24px',
        height: 'var(--header-height)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 16
      }}
    >
      {/* Brand & Incident Code */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: 38,
            height: 38,
            borderRadius: 'var(--radius-sm)',
            background: 'linear-gradient(135deg, rgba(0, 240, 255, 0.2), rgba(2, 132, 199, 0.3))',
            border: '1px solid var(--accent-cyan)'
          }}
        >
          <ShieldAlert size={22} color="var(--accent-cyan)" />
        </div>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ fontSize: '1.15rem', fontWeight: 800, letterSpacing: '-0.02em', color: 'var(--text-primary)' }}>
              CRISIS<span style={{ color: 'var(--accent-cyan)' }}>BRIDGE</span>
            </span>
            <span className="badge-tactical badge-medium font-mono" style={{ fontSize: '0.68rem' }}>
              AI INCIDENT COMMANDER
            </span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: '0.75rem', color: 'var(--text-muted)' }}>
            <span className="font-mono text-cyan" style={{ fontWeight: 600 }}>{codeName}</span>
            <span>•</span>
            <span className="font-mono">STATE v{stateVersion}</span>
          </div>
        </div>
      </div>

      {/* Center: Vertical Scenario Selector */}
      <nav aria-label="Incident Vertical" style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <label htmlFor="vertical-select" style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', fontWeight: 600 }}>
          VERTICAL:
        </label>
        <select
          id="vertical-select"
          value={currentVertical}
          onChange={(e) => onSelectVertical(e.target.value as VerticalType)}
          className="font-mono"
          style={{
            background: 'var(--bg-elevated)',
            color: 'var(--text-primary)',
            border: '1px solid var(--border-glow)',
            borderRadius: 'var(--radius-sm)',
            padding: '6px 12px',
            fontSize: '0.82rem',
            cursor: 'pointer',
            outline: 'none'
          }}
        >
          <option value="CAMPUS_EVENT">🎓 Campus Event / College Fest</option>
          <option value="HEALTHCARE_SURGE">🏥 Healthcare / ER Mass Surge</option>
          <option value="TRANSIT_TERMINAL">🚆 Metro Transit / Platform Rush</option>
          <option value="URBAN_DISASTER">🌊 Flood & Urban Rescue</option>
          <option value="HAZMAT_INDUSTRIAL">☣️ Hazmat & Chemical Leak</option>
        </select>
      </nav>

      {/* Right: Telemetry, Actions & Toggles */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        {getSeverityBadge()}

        <div
          className="font-mono"
          style={{
            fontSize: '0.82rem',
            color: 'var(--text-secondary)',
            background: 'rgba(255, 255, 255, 0.04)',
            padding: '4px 10px',
            borderRadius: 4,
            border: '1px solid var(--border-subtle)',
            display: 'flex',
            alignItems: 'center',
            gap: 6
          }}
        >
          <Activity size={14} color="var(--accent-cyan)" />
          <span>{timeStr}</span>
        </div>

        {/* Audio Toggle */}
        <button
          onClick={toggleSound}
          className="btn-tactical btn-secondary"
          title={isMuted ? 'Tactical Audio Muted (Click to Unmute)' : 'Tactical Audio Active (Click to Mute)'}
          style={{ padding: '6px 10px' }}
          aria-label={isMuted ? 'Unmute tactical audio' : 'Mute tactical audio'}
        >
          {isMuted ? <VolumeX size={16} color="var(--text-muted)" /> : <Volume2 size={16} color="var(--accent-cyan)" />}
        </button>

        {/* Test Suite Modal Button */}
        <button
          onClick={onOpenTests}
          className="btn-tactical btn-outline-cyan"
          style={{ fontSize: '0.78rem', padding: '6px 12px' }}
          title="Open Automated Verification & Quality Matrix"
        >
          <CheckCircle2 size={15} />
          <span>VERIFY SUITE</span>
        </button>

        {/* ICS-201 Report Export */}
        <button
          onClick={onOpenReport}
          className="btn-tactical btn-secondary"
          style={{ fontSize: '0.78rem', padding: '6px 12px' }}
          title="Generate FEMA / ICS-201 Incident Action Plan"
        >
          <FileText size={15} />
          <span>ICS-201 IAP</span>
        </button>

        {/* High Contrast / Light Toggle */}
        <button
          onClick={toggleTheme}
          className="btn-tactical btn-secondary"
          style={{ padding: '6px 10px' }}
          title="Toggle High Contrast / Operational Light Mode"
          aria-label="Toggle Theme"
        >
          {isLightMode ? <Moon size={16} /> : <Sun size={16} />}
        </button>
      </div>
    </header>
  );
};
