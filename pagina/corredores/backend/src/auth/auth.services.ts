import { Injectable, UnauthorizedException } from '@nestjs/common';
import { OAuth2Client } from 'google-auth-library';
import { UserService } from '../modules/user/services/user.service';

import { JwtService } from '@nestjs/jwt';
import { Role } from '../common/enums/roles.enum';

@Injectable()
export class AuthService {

  constructor(
    private usersService: UserService,
    private jwtService: JwtService
  ) {}

  private client = new OAuth2Client(
    process.env.GOOGLE_CLIENT_ID
  );

  async googleLogin(token: string) {

    const ticket = await this.client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();

    if (!payload) {
      throw new UnauthorizedException();
    }

    // buscar usuario google
    // use a runtime cast to avoid TS error if UserService doesn't declare this helper
    let user = await (this.usersService as any).findGoogleUserByEmail(
      payload.email!,
    );

    // crear si no existe
    if (!user) {

      user = await (this.usersService as any).create({
        googleId: payload.sub,
        email: payload.email!,
        nombre: payload.name!,
        foto: payload.picture,
        role: Role.CLIENT,
        estado: 'activo',
      });

    }
    
    const jwt = await this.jwtService.signAsync({
      sub: user.id,
      email: user.email,
      role: user.role,
    });

    
    return {
      message: 'Login Google exitoso',
      user,
      jwt,
    };
  }
}