import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.services';

@Controller('auth')
export class AuthController {
  //ruta para login con google POST http://localhost:3000/auth/google
  constructor(private authService: AuthService) {}

  @Post('google')
  async googleLogin(@Body() body: { token: string }) {
    return this.authService.googleLogin(body.token);
  }
}