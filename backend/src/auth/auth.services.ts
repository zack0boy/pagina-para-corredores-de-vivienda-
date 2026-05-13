import { Injectable, UnauthorizedException } from '@nestjs/common';
import { OAuth2Client } from 'google-auth-library';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {

  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}

  private client = new OAuth2Client(
    '957495637126-gpvoqbqfb1lrs4pf5fieph8pturvorlf.apps.googleusercontent.com'
  );

  async googleLogin(token: string) {

    const ticket = await this.client.verifyIdToken({
      idToken: token,
      audience:
        '957495637126-gpvoqbqfb1lrs4pf5fieph8pturvorlf.apps.googleusercontent.com',
    });

    const payload = ticket.getPayload();

    if (!payload) {
      throw new UnauthorizedException();
    }

    // buscar usuario google
    let user = await this.usersService.findGoogleUserByEmail(
      payload.email!,
    );

    // crear si no existe
    if (!user) {

      user = await this.usersService.createGoogleUser({
        googleId: payload.sub,
        email: payload.email!,
        nombre: payload.name!,
        foto: payload.picture,
        role: 'CLIENTE',
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