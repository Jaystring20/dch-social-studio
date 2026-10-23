import { VoiceProfile } from '@gitroom/nestjs-libraries/voices/voice.profiles';
import { HookFormula, StoryStructure, WritingFormat } from '@gitroom/nestjs-libraries/writing/writing.library';

export interface WritingBriefInput {
  voice: VoiceProfile;
  format: WritingFormat;
  hook?: HookFormula;
  story: StoryStructure;
  topic: string;
}

const section = (title: string, lines: string[]) => [title, ...lines, ''];

/**
 * Builds the brief the team pastes into Claude. The voice, the format, the
 * hook and the story come from the library, so the brief is the same each
 * time for the same choices. The topic is the only free text.
 */
export const composeWritingBrief = ({ voice, format, hook, story, topic }: WritingBriefInput): string => {
  const voiceLines = [
    ...voice.rules.map((rule) => `- ${rule}`),
    ...(voice.avoid.length ? ['Avoid:', ...voice.avoid.map((item) => `- ${item}`)] : []),
    ...(voice.examples.length ? ['Examples of this voice:', ...voice.examples] : []),
  ];

  return [
    'Write one piece of content following the brief below. Keep the meaning, follow the voice, and stay inside the format.',
    '',
    ...section(`Voice: ${voice.name}`, voiceLines),
    ...section(`Format: ${format.name}`, format.guidance.map((item) => `- ${item}`)),
    ...(hook
      ? section('Hook', [
          `Use this formula: ${hook.name}`,
          `Template: ${hook.template}`,
          `Example: ${hook.example}`,
          `Watch out: ${hook.trap}`,
        ])
      : []),
    ...section('Story structure', story.beats.map((beat, index) => `${index + 1}. ${beat}`)),
    ...section('Topic from the team', [topic.trim()]),
    ...section('Rules for every draft', [
      '- No em dashes. Use a comma, a colon or a new sentence.',
      '- One idea only. Use one specific detail: a name, a place, a number from the source, or a moment.',
      '- No invented numbers, results, testimonials or clients.',
      '- If a claim comes from a source, keep the source link next to it.',
    ]),
    'Reply with the finished piece only.',
  ].join('\n');
};
