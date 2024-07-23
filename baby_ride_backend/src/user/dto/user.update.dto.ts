import {
  IsNotEmpty,
  IsNumber,
  IsString,
  Max,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';

export class userUpdateDto {
  @IsString()
  @MinLength(2)
  @MaxLength(55)
  firstName: string;
  @IsString()
  @MinLength(2)
  @MaxLength(55)
  lastName: string;
  @IsString()
  @MinLength(2)
  @MaxLength(55)
  adresse: string;
  @IsString()
  @MinLength(2)
  @MaxLength(55)
  city: string;
  @IsNumber()
  @Min(10000)
  @Max(100000)
  postaleCode: number;
}
