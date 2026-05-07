import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

 async login(email: string, password: string) {
  console.log('EMAIL RECIBIDO:', email);

  const user = await this.usersService.findByEmail(email);

  console.log('USER ENCONTRADO:', user);

  if (!user) {
    throw new UnauthorizedException('Credenciales inválidas');
  }

  if (user.password !== password) {
    throw new UnauthorizedException('Credenciales inválidas');
  }

  return {
    message: 'Login exitoso',
    user: {
      id: user.idUsuario,
      email: user.email,
      role: user.rol,
    },
  };
}
  
}