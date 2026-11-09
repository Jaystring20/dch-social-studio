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
      'Leading with the tool instead of the outcome. AI is infrastructure: use it freely, but the headline is the result the reader wants.',
    ],
    examples: [],
    status: 'ready',
  },
  {
    id: 'jeremiah',
    name: 'Jeremiah Adeyemi',
    owner: 'Jeremiah Adeyemi',
    channels: ['linkedin'],
    rules: [],
    avoid: [],
    examples: [],
    status: 'draft',
  },
  {
    id: 'buildwithja',
    name: 'BuildWithJA',
    owner: 'Jeremiah Adeyemi',
    channels: ['newsletter', 'blog'],
    rules: [
      'Positioning: "I help professionals and founders build growth systems for their content, clients, offers, and operations, and I show the build step by step."',
      'Promise: AI is how you build value faster. You do not need to be a founder or a techie to build. You need an idea, the will to start, and the patience to keep going.',
      'Business of your career: this voice builds Jeremiah Adeyemi, The DigiTech Strategist, as the expert people trust. Each piece should strengthen that reputation.',
      'Core build (fixed): show one real build step by step, and where it fits, turn one client call or webinar into a week of posts, a newsletter issue and a short video.',
      'Expression (flexible): topics and formats can range across career, skills, speaking, proof, tools and lessons, as long as the core build is present.',
      'Every piece has one clear call to action, real value inside the post, and a toolkit, guide or workbook where it fits.',
      'Local context: built for African professionals and founders, using tools they can access and afford.',
      'Real operator: draw on DCH client work and training, so the advice comes from practice.',
      'Conversational and direct. Speak to one builder, using "you" and "I".',
      'Open with a real story or moment, then reveal the framework beneath it.',
      'Short paragraphs with white space. One idea at a time.',
      'Include one line the reader would quote, often on its own line.',
      'Use contrast pairs such as builders and consumers, visible and invisible, urgency and agency, inspiration and infrastructure.',
      'Faith is part of the voice. Scripture appears as a story or example (Joseph, Abraham, Ecclesiastes), not as a sermon.',
      'Name the cost honestly. Share hard-won lessons in the first person without oversharing.',
      'Close with one question or one instruction, not both.',
      'Use the recurring images (Chinese bamboo, the iceberg, Joseph’s granaries) when they fit the point, not in every piece.',
      'Optimized for the channel: the first line works alone as a hook, and the piece ends on one clear takeaway.',
      'Humanized: plain words a person would say out loud, with the author’s own phrasing kept.',
    ],
    avoid: [
      'Em dashes. Use a comma, a colon or a new sentence instead.',
      'Numbers, subscriber targets or income figures from the 12-month direction until the baselines are confirmed.',
      'Borrowed frameworks or creator names without recording the source and what was changed.',
      'AI-sounding phrasing such as "delve", "tapestry", "in today’s fast-paced world" or "unlock".',
      'Generic motivation with no framework behind it.',
      'Engagement bait such as "Thoughts?" or "Agree?".',
      'Titles or rankings that have not been checked.',
      'Academic phrasing.',
      'A preachy tone. Faith is an example, not a lecture.',
      'Invented numbers, testimonials or results.',
    ],
    examples: [
      '"Vision without infrastructure is just inspiration."',
      '"Urgency + Agency = Building."',
      '"The palace didn’t make Joseph. The prison did."',
      '"Don’t BLOW, BUILD."',
    ],
    status: 'ready',
  },
];

export const findVoiceProfile = (id: string) =>
  VOICE_PROFILES.find((profile) => profile.id === id);
