import { Injectable,NotFoundException } from '@nestjs/common';
import { CreateContratoDto } from './dto/create-contrato.dto';
import { UpdateContratoDto } from './dto/update-contrato.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Contrato } from './entities/contrato.entity';
import { Reserva } from '../reservas/entities/reserva.entity';


@Injectable()
export class ContratosService {
  constructor(
    @InjectRepository(Contrato)
    private readonly contratoRepository: Repository<Contrato>,
    @InjectRepository(Reserva)
    private readonly reservaRepository: Repository<Reserva>,
  ) {}

  async create(dto: CreateContratoDto) {

  const reserva =
    await this.reservaRepository.findOneBy({
      idReserva: dto.idReserva,
    });

  if (!reserva) {

    throw new NotFoundException(
      `Reserva with id ${dto.idReserva} not found`,
    );
  }

  const contrato =
    this.contratoRepository.create({

      montoTotal: dto.montoTotal,

      fechaInicio: dto.fechaInicio,

      fechaFin: dto.fechaFin,

      estado: 'activo',

      reserva,
    });

  return this.contratoRepository.save(
    contrato,
  );
  }

  findAll() {
    return this.contratoRepository.find({relations: ['reserva']});
  }

  findOne(id: number) {
    return this.contratoRepository.findOne({ where:{ idContrato: id,},relations: ['reserva'], });
  }

  async update(
    id: number,
    updateContratoDto: UpdateContratoDto,
  ) {

    await this.contratoRepository.update(
      id,
      updateContratoDto,
    );

    return {
      message: 'Contrato actualizado',
    };
  }

  async remove(id: number) {

    await this.contratoRepository.delete(id);

    return {
      message: `Contrato eliminado con id ${id}`,
    };
  }

}
