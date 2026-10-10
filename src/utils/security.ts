/**
 * CrisisBridge Security Suite
 * High Impact Security Controls:
 * - Anti-XSS String Sanitization (DOM / Script injection prevention)
 * - Safe Schema Validation
 * - Input Bound Checking & DoS prevention
 * - Prompt Injection / Command Neutralization
 */

export class SecurityGuard {
  private static readonly MAX_INPUT_LENGTH = 1500;
  
  // Patterns commonly used in prompt injections or script attempts
  private static readonly DANGEROUS_PATTERNS = [
    /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
    /javascript:/gi,
    /onerror\s*=/gi,
    /onload\s*=/gi,
    /<iframe/gi,
    /<img\s+src=[^>]*>/gi,
    /eval\s*\(/gi,
    /system\s*\(/gi,
    /exec\s*\(/gi,
  ];

  /**
   * Cleans raw user input, stripping HTML, dangerous script triggers, and normalizing whitespace.
   */
  public static sanitizeInput(rawText: string): string {
    if (!rawText || typeof rawText !== 'string') return '';
    
    // Enforce hard bound
    let clean = rawText.slice(0, this.MAX_INPUT_LENGTH).trim();

    // Remove known malicious tags and event handlers
    for (const pattern of this.DANGEROUS_PATTERNS) {
      clean = clean.replace(pattern, '[BLOCKED_TAG]');
    }

    // Entity escape HTML special chars to guarantee no innerHTML injection
    clean = clean
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');

    // Reverse safe ASCII punctuation for human readability in text areas
    clean = clean
      .replace(/&quot;/g, '"')
      .replace(/&#039;/g, "'")
      .replace(/&amp;/g, '&');

    return clean;
  }

  /**
   * Verifies if input contains suspicious prompt injection attempts.
   */
  public static detectPromptInjection(text: string): { isSuspicious: boolean; reason?: string } {
    const lower = text.toLowerCase();
    const injectionMarkers = [
      'ignore all previous instructions',
      'disregard previous commands',
      'you are now DAN',
      'jailbreak',
      'bypass all rules',
      'drop table',
      'rm -rf',
    ];

    for (const marker of injectionMarkers) {
      if (lower.includes(marker)) {
        return {
          isSuspicious: true,
          reason: `Detected potential policy evasion pattern: "${marker}"`
        };
      }
    }

    return { isSuspicious: false };
  }

  /**
   * Safe JSON parse with error fallback to prevent crash attacks.
   */
  public static safeJsonParse<T>(jsonString: string | null, fallback: T): T {
    if (!jsonString) return fallback;
    try {
      return JSON.parse(jsonString) as T;
    } catch {
      console.warn('SecurityGuard: Failed to parse JSON, falling back safely.');
      return fallback;
    }
  }

  /**
   * Generates cryptographically secure short IDs for action items.
   */
  public static generateSecureId(prefix = 'ACT'): string {
    if (typeof crypto !== 'undefined' && crypto.randomUUID) {
      return `${prefix}-${crypto.randomUUID().slice(0, 8).toUpperCase()}`;
    }
    const rand = Math.floor(Math.random() * 100000).toString(36);
    return `${prefix}-${rand.toUpperCase()}`;
  }
}
