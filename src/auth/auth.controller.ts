import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthUser } from './types';
import { RegisterDTO } from './dto/sign-up.dto';
import { Response } from 'express';
import { APIResponse } from 'src/types';
import { SignInDTO } from './dto/sign-in.dto';
import { AuthGuard } from './auth.guard';
import { JwtTokenPayload } from 'src/token/types';

interface RequestType extends Request {
  user: JwtTokenPayload;
}

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(
    @Res() res: Response<APIResponse<AuthUser>>,
    @Body() body: RegisterDTO,
  ) {
    try {
      const newUser = await this.authService.register(body);

      return res.send({
        message: 'Successfully registered a new user!',
        result: newUser,
      });
    } catch (error) {
      throw error;
    }
  }

  @Post('login')
  async login(
    @Res() res: Response<APIResponse<AuthUser>>,
    @Body() body: SignInDTO,
  ) {
    try {
      const user = await this.authService.login(body);

      return res.send({
        message: 'Successfully signed in!',
        result: user,
      });
    } catch (error) {
      throw error;
    }
  }

  @UseGuards(AuthGuard)
  @Get('user-info')
  async userInfo(
    @Req() req: RequestType,
    @Res() res: Response<APIResponse<AuthUser>>,
  ) {
    try {
      const { user } = req;

      const foundUser = await this.authService.userInfo(user);

      return res.send({
        message: 'Successfully signed in!',
        result: foundUser,
      });
    } catch (error) {
      throw error;
    }
  }
}
