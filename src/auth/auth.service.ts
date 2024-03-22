import {
  Injectable,
  UnauthorizedException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { CryptoService } from 'src/crypto/crypto.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { RegisterDTO } from './dto/sign-up.dto';
import { TokenService } from 'src/token/token.service';
import { SignInDTO } from './dto/sign-in.dto';
import { AuthUser } from './types';
import { JwtTokenPayload } from 'src/token/types';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly cryptoService: CryptoService,
    private readonly tokenService: TokenService,
  ) {}

  async login(data: SignInDTO): Promise<AuthUser> {
    const { email, password, remember } = data;

    const user = await this.prisma.user.findUnique({ where: { email } });

    const decryptedPassword = this.cryptoService.decrypt(password);

    const isPasswordMatched = this.cryptoService.compareHash(
      decryptedPassword,
      user.password,
    );

    if (!user || !isPasswordMatched) {
      throw new UnauthorizedException('Incorrect credentials');
    }

    const expiresIn = remember ? '30d' : '12h';

    const accessToken = this.tokenService.signAccessToken(
      {
        sub: user.id.toString(),
        email: user.email,
        isAdmin: user.isAdmin,
      },
      expiresIn,
    );

    delete user.password;

    return { user, accessToken };
  }

  async register(body: RegisterDTO): Promise<AuthUser> {
    const { email, password } = body;

    const registeredEmail = await this.prisma.user.count({ where: { email } });

    if (registeredEmail) {
      throw new UnprocessableEntityException(
        'This e-mail is already registered',
      );
    }

    const decryptedPassword = this.cryptoService.decrypt(password);
    const passwordHash = this.cryptoService.generateHash(decryptedPassword);

    await this.prisma.user.create({
      data: { ...body, password: passwordHash },
    });

    const userLogin = await this.login({
      email,
      password,
      remember: true,
    });

    return userLogin;
  }

  async userInfo(payload: JwtTokenPayload): Promise<AuthUser> {
    const { email } = payload;

    const user = await this.prisma.user.findUnique({ where: { email } });

    if (!user) {
      throw new UnauthorizedException();
    }

    delete user.password;

    return { user };
  }
}
