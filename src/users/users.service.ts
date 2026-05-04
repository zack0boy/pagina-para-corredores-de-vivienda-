import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cliente } from './users.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Cliente)
    private readonly clienteRepository: Repository<Cliente>,
  ) {}

  findAll(): Promise<Cliente[]> {
    return this.clienteRepository.find();
  }

  findOne(id: number): Promise<Cliente | null> {
    return this.clienteRepository.findOneBy({ id });
  }

  async remove(id: number): Promise<void> {
    await this.clienteRepository.delete(id);
  }

  // 🔥 forma más simple (sin QueryBuilder)
  async findByEmail(email: string): Promise<Cliente | null> {
    return this.clienteRepository.findOne({
      where: { email },
      select: ['id', 'nombre', 'email', 'password', 'role', 'isActive'],
    });
  }

  async create(data: Partial<Cliente>): Promise<Cliente> {
    const user = this.clienteRepository.create({
      ...data,
      password: data.password,
    });

    return this.clienteRepository.save(user);
  }
}