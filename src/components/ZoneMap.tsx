/**
 * CrisisBridge Interactive Zone Map
 * 
 * Vector schematic topology of the incident sector.
 * Visualizes choke points, emergency corridors, capacity thresholds,
 * unit deployments, and real-time hazard markers.
 */

import React, { useState } from 'react';
import { Map, CloudRain } from 'lucide-react';
import type { ZoneNode } from '../types/incident';

interface ZoneMapProps {
  zones: ZoneNode[];
  isRaining?: boolean;
}

export const ZoneMap: React.FC<ZoneMapProps> = ({ zones, isRaining = true }) => {
  const [selectedZoneId, setSelectedZoneId] = useState<string>(zones[0]?.id || '');

  const selectedZone = zones.find(z => z.id === selectedZoneId) || zones[0];

  const getStatusColor = (status: ZoneNode['status']) => {
    switch (status) {
      case 'BLOCKED':
      case 'HAZARD':
        return '#ef4444';
      case 'CONGESTED':
        return '#f59e0b';
      case 'CLEAR':
      default:
        return '#10b981';
    }
  };

  return (
    <section
      aria-label="Sector Topology Map"
      className="tactical-card"
      style={{
        padding: '16px 18px',
        marginTop: 20,
        position: 'relative',
        background: 'linear-gradient(180deg, rgba(13, 20, 36, 0.95) 0%, rgba(10, 15, 26, 0.9) 100%)'
      }}
    >
      <div className="scanline" />

      {/* Top Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12, flexWrap: 'wrap', gap: 10 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div
            style={{
              width: 28,
              height: 28,
              borderRadius: 'var(--radius-sm)',
              background: 'rgba(0, 240, 255, 0.12)',
              border: '1px solid var(--accent-cyan)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <Map size={16} color="var(--accent-cyan)" />
          </div>
          <div>
            <h3 style={{ fontSize: '0.92rem', fontWeight: 800, margin: 0, color: 'var(--text-primary)' }}>
              SECTOR TOPOLOGY & INGRESS CHOKE MAP
            </h3>
            <span className="font-mono text-cyan" style={{ fontSize: '0.68rem' }}>
              VECTOR SPATIAL TELEMETRY • CLICK NODE TO INSPECT
            </span>
          </div>
        </div>

        {/* Weather Indicator */}
        {isRaining && (
          <div
            className="badge-tactical badge-high font-mono"
            style={{ fontSize: '0.72rem', display: 'flex', alignItems: 'center', gap: 6 }}
          >
            <CloudRain size={13} color="var(--status-amber)" />
            <span>PRECIPITATION RADAR ACTIVE</span>
          </div>
        )}
      </div>

      {/* Layout Grid: Vector SVG Canvas + Zone Inspector Panel */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 280px', gap: 16 }}>
        {/* SVG Schematic Canvas */}
        <div
          style={{
            position: 'relative',
            width: '100%',
            height: 320,
            background: 'radial-gradient(ellipse at center, rgba(14, 28, 54, 0.7) 0%, rgba(5, 10, 20, 0.95) 100%)',
            borderRadius: 'var(--radius-sm)',
            border: '1px solid var(--border-glow)',
            overflow: 'hidden'
          }}
        >
          {/* Grid lines */}
          <svg width="100%" height="100%" style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
            <defs>
              <pattern id="tacticalGrid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(0, 240, 255, 0.05)" strokeWidth="1" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#tacticalGrid)" />

            {/* Connecting Route Lines */}
            {zones.map(z => {
              return z.connections.map(targetId => {
                const target = zones.find(tz => tz.id === targetId);
                if (!target) return null;
                const isBlocked = z.status === 'BLOCKED' || target.status === 'BLOCKED';

                return (
                  <line
                    key={`${z.id}-${targetId}`}
                    x1={`${z.x}%`}
                    y1={`${z.y}%`}
                    x2={`${target.x}%`}
                    y2={`${target.y}%`}
                    stroke={isBlocked ? 'rgba(239, 68, 68, 0.45)' : 'rgba(0, 240, 255, 0.25)'}
                    strokeWidth={isBlocked ? '2' : '1.5'}
                    strokeDasharray={isBlocked ? '6 4' : 'none'}
                  />
                );
              });
            })}
          </svg>

          {/* Interactive Zone Node Elements */}
          {zones.map(zone => {
            const isSelected = zone.id === selectedZoneId;
            const statusColor = getStatusColor(zone.status);

            return (
              <button
                key={zone.id}
                onClick={() => setSelectedZoneId(zone.id)}
                aria-label={`Zone ${zone.name}, status ${zone.status}, capacity ${zone.capacityPct}%`}
                style={{
                  position: 'absolute',
                  left: `${zone.x}%`,
                  top: `${zone.y}%`,
                  transform: 'translate(-50%, -50%)',
                  background: isSelected ? 'rgba(0, 240, 255, 0.25)' : 'rgba(13, 20, 36, 0.9)',
                  border: `2px solid ${statusColor}`,
                  boxShadow: isSelected
                    ? `0 0 16px ${statusColor}`
                    : `0 0 8px rgba(0, 0, 0, 0.6)`,
                  borderRadius: zone.type === 'GATE' ? 8 : zone.type === 'ROUTE' ? 4 : 20,
                  padding: '6px 10px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 6,
                  cursor: 'pointer',
                  zIndex: isSelected ? 10 : 2,
                  transition: 'all 0.15s ease',
                  outline: 'none'
                }}
              >
                <span
                  style={{
                    width: 9,
                    height: 9,
                    borderRadius: '50%',
                    background: statusColor,
                    boxShadow: `0 0 6px ${statusColor}`,
                    flexShrink: 0
                  }}
                />
                <span
                  className="font-mono"
                  style={{
                    fontSize: '0.74rem',
                    fontWeight: 700,
                    color: '#ffffff',
                    whiteSpace: 'nowrap'
                  }}
                >
                  {zone.name.split(' ')[0]} ({zone.capacityPct}%)
                </span>
              </button>
            );
          })}
        </div>

        {/* Selected Zone Inspector Details Panel */}
        <aside
          style={{
            background: 'rgba(255, 255, 255, 0.03)',
            border: '1px solid var(--border-subtle)',
            borderRadius: 'var(--radius-sm)',
            padding: '12px 14px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between'
          }}
        >
          <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
              <span className="font-mono text-muted" style={{ fontSize: '0.7rem' }}>
                ZONE INSPECTOR
              </span>
              <span
                className="badge-tactical"
                style={{
                  fontSize: '0.68rem',
                  borderColor: getStatusColor(selectedZone.status),
                  color: getStatusColor(selectedZone.status)
                }}
              >
                {selectedZone.status}
              </span>
            </div>

            <h4 style={{ fontSize: '0.96rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: 6 }}>
              {selectedZone.name}
            </h4>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 6, fontSize: '0.78rem', color: 'var(--text-secondary)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>Type:</span>
                <strong className="font-mono text-cyan">{selectedZone.type}</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>Occupancy / Choke:</span>
                <strong className="font-mono" style={{ color: getStatusColor(selectedZone.status) }}>
                  {selectedZone.capacityPct}%
                </strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>Units Stationed:</span>
                <strong className="font-mono">{selectedZone.unitsDeployed} marshals</strong>
              </div>
            </div>

            {selectedZone.hazardNote && (
              <div
                style={{
                  marginTop: 10,
                  background: 'rgba(239, 68, 68, 0.12)',
                  border: '1px solid rgba(239, 68, 68, 0.3)',
                  borderRadius: 4,
                  padding: '6px 8px',
                  fontSize: '0.72rem',
                  color: '#fca5a5'
                }}
              >
                <strong>Sector Hazard:</strong> {selectedZone.hazardNote}
              </div>
            )}
          </div>

          <div style={{ paddingTop: 10, borderTop: '1px solid rgba(255, 255, 255, 0.06)' }}>
            <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>
              Connected Arterials: {selectedZone.connections.length} routes
            </span>
          </div>
        </aside>
      </div>
    </section>
  );
};
