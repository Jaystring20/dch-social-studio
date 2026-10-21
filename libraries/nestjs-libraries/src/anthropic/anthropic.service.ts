import { Injectable } from '@nestjs/common';
import Anthropic from '@anthropic-ai/sdk';

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY || 'sk-ant-',
});

@Injectable()
export class AnthropicService {
  async repurposeForPlatform(content: string, platform: string, maxLength: number) {
    const response = await anthropic.messages.create({
      model: 'claude-sonnet-5-5',
      max_tokens: 1024,
      system: `Rewrite the post for ${platform}. Keep the meaning and the brand voice. Use at most ${maxLength} characters. Reply with the post text only.`,
      messages: [{ role: 'user', content }],
    });

    return response.content
      .flatMap((block) => (block.type === 'text' ? [block.text] : []))
      .join('');
  }
}
