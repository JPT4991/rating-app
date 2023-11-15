import { IsString, IsNotEmpty, IsOptional, IsUrl } from 'class-validator';

export class CreateCardDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsUrl()
  imageUrl: string;
}
