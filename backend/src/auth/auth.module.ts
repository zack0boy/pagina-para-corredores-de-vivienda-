import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  async login(email: string, password: string) {
    // 1. Buscamos al usuario usando el método que ya definiste
    const user = await this.usersService.findByEmail(email);

    // 2. Validación de existencia
    if (!user) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    // 3. Comparación directa (Texto plano)
    // Se mantiene así para agilizar las pruebas del RF-2[cite: 1]
    if (user.password !== password) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    // 4. Retorno de datos esenciales[cite: 1]
    // El 'role' es la pieza clave para redirigir al panel correspondiente (Cliente, Corredor o Admin)[cite: 1]
    return {
      message: 'Login exitoso',
      user: {
        id: user.id,
        email: user.email,
        role: user.role, 
      },
    };
  }
}