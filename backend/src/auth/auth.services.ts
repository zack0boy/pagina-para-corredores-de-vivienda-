import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async googleLogin(req) {
    if (!req.user) {
      return 'No user from google';
    }

    const googleUser = req.user;

    let user = await this.usersService.findByEmail(
      googleUser.email,
    );

    if (!user) {
      user = await this.usersService.create({
        nombre: googleUser.nombre,
        email: googleUser.email,
        password: '',
        rol: 'CLIENTE',
        estado: 'activo',
      });
    }

    const payload = {
      sub: user.idUsuario,
      email: user.email,
      rol: user.rol,
    };

    const token = this.jwtService.sign(payload);

    return {
      message: 'Login con Google exitoso',
      access_token: token,
      user,
    };
  }
}