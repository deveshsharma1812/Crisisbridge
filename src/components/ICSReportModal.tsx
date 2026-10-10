/**
 * CrisisBridge ICS-201 Incident Action Plan (IAP) Modal
 * Exports FEMA/ICS standard incident command briefing sheet
 */

import React, { useState } from 'react';
import { X, Download, Printer, Copy, Check, FileText } from 'lucide-react';
import type { IncidentState } from '../types/incident';
import { generateICS201Markdown, downloadFile } from '../utils/exportIAP';

interface ICSReportModalProps {
  incident: IncidentState;
  onClose: () => void;
}

export const ICSReportModal: React.FC<ICSReportModalProps> = ({ incident, onClose }) => {
  const [copied, setCopied] = useState(false);
  const markdownContent = generateICS201Markdown(incident);

  const handleDownload = () => {
    downloadFile(markdownContent, `ICS-201_${incident.codeName.replace(/\s+/g, '_')}_IAP.md`);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(markdownContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="modal-overlay" onClick={onClose} role="dialog" aria-modal="true" aria-labelledby="modal-ics-title">
      <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ padding: '24px 28px', maxWidth: 900 }}>
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div
              style={{
                width: 36,
                height: 36,
                borderRadius: 'var(--radius-sm)',
                background: 'rgba(56, 189, 248, 0.15)',
                border: '1px solid var(--accent-blue)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <FileText size={20} color="var(--accent-blue)" />
            </div>
            <div>
              <h2 id="modal-ics-title" style={{ fontSize: '1.1rem', fontWeight: 800, margin: 0, color: 'var(--text-primary)' }}>
                FEMA ICS-201 INCIDENT BRIEFING & ACTION PLAN (IAP)
              </h2>
              <span className="font-mono text-cyan" style={{ fontSize: '0.72rem' }}>
                STANDARDIZED OPERATIONAL DIRECTIVE RECORD • STATE HASH v{incident.stateVersion}
              </span>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <button
              onClick={handleCopy}
              className="btn-tactical btn-secondary"
              style={{ padding: '6px 12px', fontSize: '0.78rem' }}
              title="Copy markdown to clipboard"
            >
              {copied ? <Check size={14} color="var(--status-emerald)" /> : <Copy size={14} />}
              <span>{copied ? 'COPIED' : 'COPY'}</span>
            </button>

            <button
              onClick={handlePrint}
              className="btn-tactical btn-secondary"
              style={{ padding: '6px 12px', fontSize: '0.78rem' }}
              title="Print official report"
            >
              <Printer size={14} />
              <span>PRINT</span>
            </button>

            <button
              onClick={handleDownload}
              className="btn-tactical btn-primary"
              style={{ padding: '6px 12px', fontSize: '0.78rem' }}
              title="Download Markdown file"
            >
              <Download size={14} />
              <span>DOWNLOAD .MD</span>
            </button>

            <button
              onClick={onClose}
              className="btn-tactical btn-secondary"
              style={{ padding: '6px' }}
              aria-label="Close report modal"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Formatted Preview Box */}
        <div
          style={{
            background: 'rgba(5, 8, 16, 0.95)',
            border: '1px solid var(--border-subtle)',
            borderRadius: 'var(--radius-sm)',
            padding: '16px 20px',
            maxHeight: '60vh',
            overflowY: 'auto',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.8rem',
            color: 'var(--text-secondary)',
            whiteSpace: 'pre-wrap',
            lineHeight: 1.55
          }}
        >
          {markdownContent}
        </div>
      </div>
    </div>
  );
};
