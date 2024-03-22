import { IsString, IsEmail } from 'class-validator';

export class RegisterDTO {
  @IsString()
  @IsEmail()
  readonly email: string;

  @IsString()
  readonly password: string;

  @IsString()
  readonly firstName: string;

  @IsString()
  readonly lastName: string;

  @IsString()
  readonly phone: string;

  @IsString()
  readonly address: string;
}
