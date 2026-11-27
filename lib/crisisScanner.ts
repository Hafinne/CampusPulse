/**
 * Client-side Tier 2 Crisis Keyword Scanner (Non-Diagnostic Safety Trigger)
 *
 * Scans the optional 140-character Micro-Vent note strictly inside the browser
 * to immediately surface 24/7 crisis helplines when acute distress language is detected.
 * No personal data or text is transmitted to external servers.
 */

export interface CrisisScanResult {
  triggered: boolean;
  matchedKeyword: string | null;
}

const CRISIS_KEYWORDS: string[] = [
  // English explicit distress / crisis phrases
  'suicide',
  'suicidal',
  'kill myself',
  'end my life',
  'hurt myself',
  'self harm',
  'self-harm',
  'want to die',
  'don\'t want to live',
  'dont want to live',
  'no reason to live',
  'hopeless',
  'can\'t go on',
  'cant go on',
  'crisis',
  // Turkish explicit distress / crisis phrases
  'intihar',
  'kendime zarar',
  'ölmek istiyorum',
  'olmek istiyorum',
  'yaşamak istemiyorum',
  'yasamak istemiyorum',
  'dayanamıyorum',
  'dayanamiyorum',
  'umutsuzum',
  'bitirmek istiyorum',
  'kriz',
];

export function scanForCrisisKeywords(text: string): CrisisScanResult {
  if (!text || !text.trim()) {
    return { triggered: false, matchedKeyword: null };
  }

  const normalized = text.toLocaleLowerCase('tr-TR').trim();

  for (const keyword of CRISIS_KEYWORDS) {
    if (normalized.includes(keyword)) {
      return {
        triggered: true,
        matchedKeyword: keyword,
      };
    }
  }

  return { triggered: false, matchedKeyword: null };
}
