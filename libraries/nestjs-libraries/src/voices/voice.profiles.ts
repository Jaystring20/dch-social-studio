/**
 * Who writes in which voice. A profile is used by the repurposing brief, so
 * the prompt carries the right rules and examples for the channel.
 *
 * `channels` lists Postiz provider identifiers. Newsletter and blog are not
 * Postiz channels yet, so they are listed for when they are added.
 *
 * Rules marked as drafts are placeholders. Only add rules, examples and
 * claims that are true for DCH or Jeremiah Adeyemi, and never invent figures,
 * testimonials or clients.
 */
export interface VoiceProfile {
  id: string;
  name: string;
  owner: string;
  channels: string[];
  rules: string[];
  avoid: string[];
  examples: string[];
  status: 'draft' | 'ready';
}

export const VOICE_PROFILES: VoiceProfile[] = [
  {
    id: 'dch',
    name: 'Digital Creatives Hub',
    owner: 'Digital Creatives Hub',
    channels: ['linkedin-page', 'blog'],
    rules: [
      'Plain, warm and confident. Short sentences.',
      'Speak to business owners and teams directly.',
      'Describe DCH as a business development creative agency that builds the brand, platforms and people behind a business’s growth.',
      'Lead with what the reader can do or understand, then the reason.',
    ],
    avoid: [
      'Em dashes.',
      'Invented numbers, testimonials, prices, clients or results.',
      'Claims that DCH did not make or deliver.',
      'AI as the headline. AI is part of how the work is done, not the pitch.',
    ],
    examples: [],
    status: 'ready',
  },
  {
    id: 'jeremiah',
    name: 'Jeremiah Adeyemi',
    owner: 'Jeremiah Adeyemi',
    channels: ['linkedin', 'newsletter'],
    rules: [],
    avoid: [],
    examples: [],
    status: 'draft',
  },
];

export const findVoiceProfile = (id: string) =>
  VOICE_PROFILES.find((profile) => profile.id === id);
