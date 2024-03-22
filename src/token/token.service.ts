import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { JwtTokenPayload } from './types';

@Injectable()
export class TokenService {
  private readonly secret: string;

  constructor(
    private readonly config: ConfigService,
    private readonly jwtService: JwtService,
  ) {
    this.secret = this.config.get('jwt.secret');
  }

  signAccessToken(payload: JwtTokenPayload, expiresIn?: string): string {
    return this.jwtService.sign(payload, {
      secret: this.secret,
      expiresIn: expiresIn || '12h',
    });
  }

  verifyAccessToken(token: string): JwtTokenPayload {
    return this.jwtService.verify(token, {
      secret: this.secret,
    });
  }
}
