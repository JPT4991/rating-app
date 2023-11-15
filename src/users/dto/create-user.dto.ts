import {
  IsEmail,
  IsString,
  MinLength,
  Matches,
  IsBoolean,
} from 'class-validator';

export class CreateUserDto {
  @IsEmail({}, { message: 'Email must be a valid email address' })
  email: string;

  @IsString()
  @Matches(/^[a-zA-Z0-9-_@]+$/, {
    message: 'Username cannot contain empty spaces',
  })
  username: string;

  @IsString()
  @MinLength(8, {
    message: 'Password must be at least 8 characters long',
  })
  @Matches(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W)/, {
    message:
      'Password must include numbers, uppercase letters, and at least a symbol',
  })
  password: string;

  @IsBoolean()
  isDeveloper: boolean;
}
