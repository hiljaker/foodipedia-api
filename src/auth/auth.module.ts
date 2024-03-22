import { Module } from '@nestjs/common';
import { TokenModule } from 'src/token/token.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { CryptoModule } from 'src/crypto/crypto.module';

@Module({
  imports: [TokenModule, CryptoModule],
  providers: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
