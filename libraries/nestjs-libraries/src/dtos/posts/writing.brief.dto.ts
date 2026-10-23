import { IsDefined, IsNumber, IsOptional, IsString, MaxLength, MinLength } from 'class-validator';

export class WritingBriefDto {
  @IsString()
  @IsDefined()
  voiceId: string;

  @IsString()
  @IsDefined()
  formatId: string;

  @IsOptional()
  @IsNumber()
  hookId?: number;

  @IsString()
  @IsDefined()
  storyId: string;

  @IsString()
  @MinLength(3)
  @MaxLength(2000)
  topic: string;
}
