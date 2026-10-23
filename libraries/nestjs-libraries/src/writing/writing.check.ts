/**
 * The check step: reads a pasted draft and flags what needs a human decision.
 * It never rewrites the draft. Every finding is a reason to look again, and
 * the writer decides what to change.
 */

export type CheckSeverity = 'error' | 'warning' | 'info';

export interface CheckFinding {
  severity: CheckSeverity;
  message: string;
}

const AI_PHRASES = [
  'delve',
  'tapestry',
  'unlock',
  'game-changer',
  'game changer',
  'navigate the landscape',
  'in today’s fast-paced world',
  "in today's fast-paced world",
  'it’s important to note',
  "it's important to note",
  'dive into',
  'seamless',
];

const LINK = /https?:\/\/\S+/i;
const NUMBER = /\d|%|\$|₦/;
const EM_DASH = /[—–]/;

const words = (text: string) => text.trim().split(/\s+/).filter(Boolean).length;

export const checkDraft = (text: string, formatId?: string, maxLength?: number): CheckFinding[] => {
  const findings: CheckFinding[] = [];
  const body = text.trim();
  const firstLine = body.split('\n')[0] || '';

  if (body.length === 0) {
    return [{ severity: 'error', message: 'The draft is empty.' }];
  }

  if (EM_DASH.test(body)) {
    findings.push({
      severity: 'error',
      message: 'Contains an em or en dash. Use a comma, a colon or a new sentence instead.',
    });
  }

  const lower = body.toLowerCase();
  for (const phrase of AI_PHRASES) {
    if (lower.includes(phrase)) {
      findings.push({ severity: 'warning', message: `Sounds like AI: "${phrase}". Say it the way you would out loud.` });
    }
  }

  if (maxLength && body.length > maxLength) {
    findings.push({ severity: 'error', message: `${body.length} characters, over the channel limit of ${maxLength}.` });
  }

  if (formatId === 'post') {
    if (body.length < 900 || body.length > 1300) {
      findings.push({ severity: 'warning', message: `${body.length} characters. The working range for a post is 900 to 1,300.` });
    }
    if (LINK.test(body)) {
      findings.push({ severity: 'warning', message: 'Contains a link. LinkedIn suppresses posts with links, so put it in the first comment.' });
    }
  }

  if (formatId === 'article' || formatId === 'newsletter') {
    const count = words(body);
    const range = formatId === 'article' ? [800, 1500] : [700, 1200];
    if (count < range[0] || count > range[1]) {
      findings.push({ severity: 'warning', message: `${count} words. This format targets ${range[0]} to ${range[1]}.` });
    }
  }

  if (firstLine.length > 210) {
    findings.push({ severity: 'warning', message: 'The first line is over 210 characters, so the feed will cut it before the hook lands.' });
  }
  if (firstLine.includes('?')) {
    findings.push({ severity: 'info', message: 'The first line is a question. It only works if only you could ask it.' });
  }

  if (NUMBER.test(body) && !LINK.test(body)) {
    findings.push({ severity: 'warning', message: 'A number appears with no source link. Add the source or remove the number.' });
  }

  if (!NUMBER.test(body) && !/"[^"]+"|“[^”]+”/.test(body)) {
    findings.push({ severity: 'info', message: 'No number or quote. Add one specific detail: a name, a place, a figure or a moment.' });
  }

  if (findings.length === 0) {
    findings.push({ severity: 'info', message: 'No automatic issues found. Read it aloud, then check the claims yourself.' });
  }

  return findings;
};
