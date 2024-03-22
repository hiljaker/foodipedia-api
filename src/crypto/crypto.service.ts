import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createCipheriv, createDecipheriv, randomBytes } from 'crypto';
import { compareSync, hashSync } from 'bcrypt';
import { AppConfig } from 'src/config';

@Injectable()
export class CryptoService {
  private readonly algorithm: string;
  private readonly key: string;
  private readonly iv: string;
  private readonly saltRounds: number;

  constructor(private readonly config: ConfigService) {
    const appConfig = this.config.getOrThrow<AppConfig>('app');

    this.algorithm = appConfig.algorithm;
    this.key = appConfig.key;
    this.iv = appConfig.iv;
    this.saltRounds = appConfig.saltRounds;
  }

  encrypt(plain: string): string {
    const cipher = createCipheriv(this.algorithm, this.key, this.iv);
    let encrypted = cipher.update(plain, 'utf-8', 'hex');
    encrypted += cipher.final('hex');

    return encrypted;
  }

  decrypt(hash: string): string {
    const decipher = createDecipheriv(this.algorithm, this.key, this.iv);
    let decrypted = decipher.update(hash, 'hex', 'utf-8');
    decrypted += decipher.final('utf-8');

    return decrypted;
  }

  generateHash(plain: string): string {
    const hashed = hashSync(plain, this.saltRounds);
    return hashed;
  }

  compareHash(plain: string, hash: string): boolean {
    const isMatch = compareSync(plain, hash);
    return isMatch;
  }

  generateRandomByte(): string {
    const random = randomBytes(32).toString('hex');
    return random;
  }
}
