import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UsersGoogle } from './entities/users_google.entity';
import { Corredor } from './entities/corredor.entity';
import { Role } from '../common/enums/roles.enum';
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UsersGoogle)
    private readonly usersGoogleRepository: Repository<UsersGoogle>,
    @InjectRepository(Corredor)
    private readonly corredorRepository: Repository<Corredor>,
  ) {}

  findAll(): Promise<UsersGoogle[]> {
    return this.usersGoogleRepository.find();
  }
  
  findOne(id: number): Promise<UsersGoogle | null> {
    return this.usersGoogleRepository.findOne({
      where: { id },
    });
  }

  async remove(id: number): Promise<void> {
    await this.usersGoogleRepository.delete({ id });
  }
  
  async create(data: Partial<UsersGoogle>): Promise<UsersGoogle> {
    const user = this.usersGoogleRepository.create({
      ...data,
    });

    return this.usersGoogleRepository.save(user);
  }

  async findGoogleUserByEmail(email: string) {
  return this.usersGoogleRepository.findOne({
    where: { email },
  });
}
async assignCorredor(idUsuario: number) {

  // actualizar rol
  await this.usersGoogleRepository.update(
    { id: idUsuario },
    { role: Role.CORREDOR },
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
}