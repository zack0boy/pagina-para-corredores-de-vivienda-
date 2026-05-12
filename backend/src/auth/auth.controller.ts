import {Controller,Get,Req,UseGuards,} from '@nestjs/common';
import {AuthGuard,} from '@nestjs/passport';
import { AuthService } from '../auth/auth.services';
@Controller('auth')
export class AuthController {

  constructor(
    private readonly authService: AuthService,
  ) {}

  @Get('google')
  @UseGuards(AuthGuard('google'))
  async googleAuth() {}

  @Get('google/redirect')
  @UseGuards(AuthGuard('google'))
  async googleRedirect(
    @Req() req: any,
  ) {

    return this.authService.googleLogin(
      req.user,
    );
  }
}