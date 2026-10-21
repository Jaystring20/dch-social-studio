import {
  ArrayMinSize,
  IsArray,
  IsDefined,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

class RepurposeVariant {
  @IsString()
  @IsDefined()
  integrationId: string;

  @IsString()
  @IsDefined()
  content: string;
}

export class RepurposePostDto {
  @IsString()
  @IsDefined()
  postId: string;

  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => RepurposeVariant)
  variants: RepurposeVariant[];
}
