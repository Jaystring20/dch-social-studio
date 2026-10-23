/**
 * The writing library: hook formulas, formats and story structures. Each one
 * is data, so it can be reviewed and edited without touching the code that
 * builds the brief. Voice profiles live in ../voices/voice.profiles.ts.
 */

export interface HookFormula {
  id: number;
  name: string;
  template: string;
  example: string;
  bestFor: string;
  trap: string;
}

export interface WritingFormat {
  id: string;
  name: string;
  guidance: string[];
}

export interface StoryStructure {
  id: string;
  name: string;
  beats: string[];
}

export const HOOK_FORMULAS: HookFormula[] = [
  { id: 1, name: 'Contrarian Take', template: 'Everyone says {common advice}. After {specific experience}, I think that is wrong.', example: 'Everyone says post daily. I posted 4x a week for a year and beat every daily poster in my niche.', bestFor: 'Establishing a point of view.', trap: 'Being contrarian about something nobody believes. The belief has to be genuinely common.' },
  { id: 2, name: 'Number Reveal', template: 'I {did thing} for {N} {days/weeks}. Here is what actually happened.', example: 'I sent 400 cold DMs in 30 days. 11 replied. 2 became clients.', bestFor: 'Experiments and anything with a countable result.', trap: 'Burying the number. Put it in line 1 or the formula does nothing.' },
  { id: 3, name: 'Mistake Confession', template: '{Specific cost} is what {one mistake} cost me.', example: 'Two years of hours wasted on formatting is what charging by the hour cost me.', bestFor: 'Lessons learned the hard way.', trap: 'Confessing something small. The cost has to be real.' },
  { id: 4, name: 'Before / After', template: '{Time ago} I was {low state}. Today I {high state}. The difference was {one thing}.', example: 'A year ago I had no clients outside my network. Today I have three. The difference was one weekly review.', bestFor: 'Transformation with one clear cause.', trap: 'Several causes. Pick the one that matters.' },
  { id: 5, name: 'The List Promise', template: '{N} things I wish someone had told me before {milestone}.', example: 'Seven things I wish someone had told me before my first client call.', bestFor: 'Practical lessons people will save.', trap: 'A list with no reason to keep reading. Each item must earn its place.' },
  { id: 6, name: 'Insider Secret', template: 'After {N} years {doing thing}, here is the part nobody puts in the {job posting/course/pitch}.', example: 'After ten years in brand work, here is the part nobody puts in a brand proposal.', bestFor: 'Behind-the-scenes insight.', trap: 'A secret everyone already knows.' },
  { id: 7, name: 'The Callout', template: 'If you are still {doing outdated thing}, stop.', example: 'If you are still judging a brand by its logo, stop.', bestFor: 'Direct, opinionated advice.', trap: 'Calling out people, not practices.' },
  { id: 8, name: 'Question Trap', template: '{Specific scenario with a real cost}. What do you do?', example: 'A client asks for the logo by Friday, but the strategy is not signed off. What do you do?', bestFor: 'Opening a real debate.', trap: 'A vague question. Only you could ask this one.' },
  { id: 9, name: 'Story Cold Open', template: '"{Line of dialogue}" {Who said it, when, and why it mattered}.', example: '"We do not need strategy, we need posts." A client said that in our first meeting. It was the best thing that happened to us that year.', bestFor: 'Stories with a turn.', trap: 'Dialogue that never gets to its point.' },
  { id: 10, name: 'The Receipt', template: '{Screenshot or hard number}. {One sentence of context}.', example: 'Eleven enquiries from one post. Here is the post and why it worked.', bestFor: 'Proof, when you can show it.', trap: 'Showing a number with no context.' },
  { id: 11, name: 'Myth Bust', template: '{Popular explanation} is not why {bad outcome} is happening to you.', example: 'A small budget is not why your brand is invisible.', bestFor: 'Correcting a common belief.', trap: 'Dismissing a belief without giving the real cause.' },
  { id: 12, name: 'The Comparison', template: '{Expensive option} vs {cheap option}. {Surprising verdict}.', example: 'A full agency retainer vs one freelancer for a month. The freelancer won, here is why.', bestFor: 'Helping someone decide.', trap: 'A comparison that is not fair to both sides.' },
  { id: 13, name: 'Permission Slip', template: 'You are allowed to {thing the reader feels guilty about}.', example: 'You are allowed to stop posting on a platform that is not working for you.', bestFor: 'Releasing guilt and encouraging a decision.', trap: 'Permission for something harmful.' },
  { id: 14, name: 'Pattern Interrupt', template: '{One word or three-word line, full stop.}', example: 'Stop chasing reach.', bestFor: 'Grabbing attention in a crowded feed.', trap: 'A line that means nothing without the post.' },
  { id: 15, name: 'The Warning', template: '{Common practice} is quietly costing you {specific thing they care about}.', example: 'Sending every proposal as a PDF is quietly costing you the clients who never open PDFs.', bestFor: 'Pointing out a hidden cost.', trap: 'A vague cost. Name it.' },
  { id: 16, name: 'Good vs Great', template: 'Good {role} {do X}. Great {role} {do Y}.', example: 'Good founders ship fast. Great founders ship and then listen.', bestFor: 'Raising the standard.', trap: 'Making the good version a straw man.' },
  { id: 17, name: 'Time Anchor', template: '{Task} used to take me {long time}. It now takes {short time}.', example: 'Writing a proposal used to take me five hours. It now takes twenty minutes.', bestFor: 'Efficiency and process.', trap: 'A time with no way to show how.' },
  { id: 18, name: 'The Unpopular Rule', template: 'I do not {widely accepted practice}. Ever. Here is why.', example: 'I do not send a deck before the first call. Ever. Here is why.', bestFor: 'Stating a rule you actually follow.', trap: 'A rule you do not follow.' },
  { id: 19, name: 'Curiosity Gap', template: 'The {superlative} {thing} I ever {verb} {broke the obvious rule}.', example: 'The worst client I ever signed broke the obvious rule, and taught me the most.', bestFor: 'Making readers want the end.', trap: 'A gap the post never closes.' },
  { id: 20, name: 'The Walk-Away', template: 'I {fired/quit/deleted/cancelled} {valuable thing}. {Result}.', example: 'I cancelled my biggest retainer. Revenue dipped, then the team got its weekends back.', bestFor: 'Showing a bold decision.', trap: 'A decision with no result.' },
  { id: 21, name: 'The Direct Value', template: 'Here is the exact {artifact} I used to {specific outcome}. Steal it.', example: 'Here is the exact brief template I used to get three clients to say yes in one call.', bestFor: 'Giving something useful.', trap: 'A template that is generic. It must be the real one.' },
];

export const WRITING_FORMATS: WritingFormat[] = [
  {
    id: 'post',
    name: 'LinkedIn post',
    guidance: [
      'Target 900 to 1,300 characters.',
      'Line 1 is the hook and must work on its own. Line 2 is the payoff, not setup.',
      'Short paragraphs of one to three lines, with a blank line between each.',
      'One idea, one takeaway, then one question or one instruction, never both.',
      'No links in the body.',
    ],
  },
  {
    id: 'carousel',
    name: 'Carousel',
    guidance: [
      'Six to ten slides. One idea per slide.',
      'Slide 1 is the cover: the hook, in as few words as possible.',
      'Each slide makes the reader want the next one.',
      'The last slide gives one takeaway and one instruction.',
    ],
  },
  {
    id: 'article',
    name: 'Article',
    guidance: [
      'Target 800 to 1,500 words.',
      'A headline that names the reader and the outcome.',
      'Open with a real moment, then move to the framework.',
      'Three sections at most, each with one clear point.',
      'Close with one practical step the reader can take this week.',
    ],
  },
  {
    id: 'newsletter',
    name: 'Newsletter issue',
    guidance: [
      'Target 700 to 1,200 words.',
      'A subject line under 50 characters, and a preview line that adds to it.',
      'Open with a story, then the framework, then one step.',
      'End with one question for the reader to answer.',
    ],
  },
];

export const STORY_STRUCTURES: StoryStructure[] = [
  {
    id: 'human-to-system',
    name: 'Human entry, then the system',
    beats: [
      'Human entry: open with a real moment that makes the reader feel something.',
      'Systemic mapping: show the pattern or framework beneath the moment.',
      'Transformative insight: the reframe that changes how the reader sees it.',
      'Actionable pathway: one practical step, and why it matters.',
      'Checkpoint: the one question to carry forward.',
    ],
  },
  {
    id: 'problem-solution',
    name: 'Problem, cause, fix',
    beats: [
      'The problem the reader already feels.',
      'Why it keeps happening, the real cause.',
      'What changes it, in plain steps.',
      'How to start this week.',
    ],
  },
  {
    id: 'before-after-bridge',
    name: 'Before, shift, after',
    beats: [
      'Where I was, honestly.',
      'The shift that changed it.',
      'Where I am now, with the proof.',
      'What you can do to make the same shift.',
    ],
  },
  {
    id: 'story-lesson-question',
    name: 'Story, lesson, question',
    beats: [
      'The story in two or three lines.',
      'The lesson, in one sentence.',
      'One question to the reader.',
    ],
  },
];
