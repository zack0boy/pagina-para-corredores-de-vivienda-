import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Usuario} from './entitys/usuario.entity';
import { UsersGoogle } from './entitys/users_google.entity';
import { Corredor } from './entitys/corredor.entity';
import { Role } from '../common/enums/roles.enum';
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Usuario)
    private readonly usuarioRepository: Repository<Usuario>,
    @InjectRepository(UsersGoogle)
    private readonly usersGoogleRepository: Repository<UsersGoogle>,
    @InjectRepository(Corredor)
    private readonly corredorRepository: Repository<Corredor>,
  ) {}

  findAll(): Promise<Usuario[]> {
    return this.usuarioRepository.find();
  }

  findOne(id: number): Promise<Usuario | null> {
    return this.usuarioRepository.findOne({
      where: { idUsuario: id },
    });
  }

  async remove(id: number): Promise<void> {
    await this.usuarioRepository.delete({ idUsuario: id });
  }


  async findByEmail(email: string): Promise<Usuario | null> {
  return this.usuarioRepository.findOne({
    where: { email },
  });
  }
  
  async create(data: Partial<Usuario>): Promise<Usuario> {
    const user = this.usuarioRepository.create({
      ...data,
    });

    return this.usuarioRepository.save(user);
  }
  async createGoogleUser(data: Partial<UsersGoogle>) {

    const user = this.usersGoogleRepository.create(data);

    return this.usersGoogleRepository.save(user);
  }
  async findGoogleUserByEmail(email: string) {
  return this.usersGoogleRepository.findOne({
    where: { email },
  });
}
async assignCorredor(idUsuario: number) {

  // actualizar rol
  await this.usuarioRepository.update(
    { idUsuario },
    { rol: 'CORREDOR' },
  );

  // verificar si ya existe
  const corredorExistente =
    await this.corredorRepository.findOne({
      where: { idUsuario },
    });

  if (!corredorExistente) {

    const corredor =
      this.corredorRepository.create({
        idUsuario,
        licenciaProfesional: 'PENDIENTE',
      });

    await this.corredorRepository.save(corredor);
  }

  return {
    message: 'Usuario asignado como corredor',
  };
}

async assignCorredorGoogle(id: number) {

  await this.usersGoogleRepository.update(
    { id },
    {
      role: Role.CORREDOR,
    },
  );

  const corredorExistente =
    await this.corredorRepository.findOne({
      where: {
        idUsuario: id,
      },
    });

  if (!corredorExistente) {

    const corredor =
      this.corredorRepository.create({
        idUsuario: id,
        licenciaProfesional: 'PENDIENTE',
      });

    await this.corredorRepository.save(corredor);
  }

  return {
    message: 'Usuario Google asignado como corredor',
  };
}
}