import { ArrayMinSize, IsArray, IsDefined, IsString } from 'class-validator';

export class RepurposePostDto {
  @IsString()
  @IsDefined()
  postId: string;

  @IsArray()
  @ArrayMinSize(1)
  @IsString({ each: true })
  integrationIds: string[];
}
