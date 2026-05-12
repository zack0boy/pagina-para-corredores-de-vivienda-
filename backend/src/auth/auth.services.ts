import { Injectable, UnauthorizedException } from '@nestjs/common';
import { OAuth2Client } from 'google-auth-library';

@Injectable()
export class AuthService {

  private client = new OAuth2Client(
    '957495637126-gpvoqbqfb1lrs4pf5fieph8pturvorlf.apps.googleusercontent.com'
  );

  async googleLogin(token: string) {

    const ticket = await this.client.verifyIdToken({
      idToken: token,
      audience: '957495637126-gpvoqbqfb1lrs4pf5fieph8pturvorlf.apps.googleusercontent.com',
    });

    const payload = ticket.getPayload();

    if (!payload) {
      throw new UnauthorizedException();
    }

    return {
      message: 'Login Google exitoso',
      user: {
        email: payload.email,
        nombre: payload.name,
        foto: payload.picture,
      }
    };
  }
}