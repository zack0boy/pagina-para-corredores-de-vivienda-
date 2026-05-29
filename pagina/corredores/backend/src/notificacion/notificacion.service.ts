import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateNotificacionDto } from './dto/create-notificacion.dto';
import { UpdateNotificacionDto } from './dto/update-notificacion.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Notificacion } from './entities/notificacion.entity';
import { Usuario } from '../users/entities/usuario.entity';
import { UsersGoogle } from '../users/entities/users_google.entity';

@Injectable()
export class NotificacionService {

  constructor(

    @InjectRepository(Notificacion)
    private readonly notificacionRepository:
      Repository<Notificacion>,

    @InjectRepository(UsersGoogle)
    private readonly usersGoogleRepository:
      Repository<UsersGoogle>,
  ) {}

  async create(
    dto: CreateNotificacionDto,
  ) {

    const usuario =
      await this.usersGoogleRepository.findOneBy({
        id: dto.idUsuario,
      });

    if (!usuario) {

      throw new NotFoundException(
        'Usuario no encontrado',
      );
    }

    const notificacion =
      this.notificacionRepository.create({

        mensaje: dto.mensaje,

        tipo: dto.tipo,

        idReferencia: dto.idReferencia,

        leido: false,

        usuario,
      });

    return this.notificacionRepository.save(
      notificacion,
    );
  }

  findAll() {

    return this.notificacionRepository.find({
      relations: ['usuario'],
    });
  }

  findOne(id: number) {

    return this.notificacionRepository.find({

      where: {
        idNotificacion: id,
      },

      relations: ['usuario'],
    });
  }

  async update(
    id: number,
    dto: UpdateNotificacionDto,
  ) {

    await this.notificacionRepository.update(
      id,
      dto,
    );

    return {
      message: 'Notificación actualizada',
    };
  }

  async remove(id: number) {

    await this.notificacionRepository.delete(
      id,
    );

    return {
      message: 'Notificación eliminada',
    };
  }
}