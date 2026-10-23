import { IsOptional, IsString, MaxLength, MinLength } from 'class-validator';

export class WritingCheckDto {
  @IsString()
  @MinLength(1)
  @MaxLength(20000)
  text: string;

  @IsOptional()
  @IsString()
  formatId?: string;
}
