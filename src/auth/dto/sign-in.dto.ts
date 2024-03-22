import { IsBoolean, IsEmail, IsOptional, IsString } from 'class-validator';

export class SignInDTO {
  @IsEmail()
  @IsString()
  readonly email: string;

  @IsString()
  readonly password: string;

  @IsOptional()
  @IsBoolean()
  readonly remember: boolean;
}
