import {Injectable,NotFoundException,} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateReservaDto } from './dto/create-reserva.dto';
import { UpdateReservaDto } from './dto/update-reserva.dto';
import { Reserva } from './entities/reserva.entity';
import { UsersGoogle } from '../modules/user/entities/users-google.entity';

@Injectable()
export class ReservasService {

  constructor(

    @InjectRepository(Reserva)
    private reservaRepository: Repository<Reserva>,

    @InjectRepository(UsersGoogle)
    private usersGoogleRepository: Repository<UsersGoogle>,

  ) {}

  async create(
    dto: CreateReservaDto,
    userId: number,
  ) {

    const user =
      await this.usersGoogleRepository.findOne({
        where: {
          id: userId,
        } as any,
      });

    if (!user) {

      throw new NotFoundException(
        'Usuario no encontrado',
      );
    }

    const reserva =
      this.reservaRepository.create({

        idPropiedad: dto.idPropiedad,

        fechaReserva: dto.fechaReserva,

        montoReserva: dto.montoReserva,

        estado: 'pendiente',

        cliente: user,
      });

    return this.reservaRepository.save(
      reserva,
    );
  }

  findAll() {

    return this.reservaRepository.find({
      relations: ['cliente'],
    });
  }

  findOne(id: number) {

    return this.reservaRepository.findOne({
      where: {
        idReserva: id,
      },
      relations: ['cliente'],
    });
  }

  async update(
    id: number,
    updateReservaDto: UpdateReservaDto,
  ) {

    await this.reservaRepository.update(
      id,
      updateReservaDto,
    );

    return {
      message: 'Reserva actualizada',
    };
  }

  async remove(id: number) {

    await this.reservaRepository.delete(id);
    return {

      message: 'Reserva eliminada',
    };
  }
}