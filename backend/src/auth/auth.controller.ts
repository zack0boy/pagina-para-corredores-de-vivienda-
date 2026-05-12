import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.services';

@Controller('auth')
export class AuthController {

  constructor(private authService: AuthService) {}

  @Post('google')
  async googleLogin(@Body() body: { token: string }) {
    return this.authService.googleLogin(body.token);
  }
}