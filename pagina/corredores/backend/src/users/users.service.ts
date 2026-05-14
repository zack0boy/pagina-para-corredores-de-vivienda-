import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Usuario,UsersGoogle } from './users.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Usuario)
    private readonly usuarioRepository: Repository<Usuario>,
    @InjectRepository(UsersGoogle)
    private readonly usersGoogleRepository: Repository<UsersGoogle>,
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
}