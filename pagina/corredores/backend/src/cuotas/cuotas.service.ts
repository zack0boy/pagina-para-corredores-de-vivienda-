import { Injectable,NotFoundException } from '@nestjs/common';
import { CreateCuotaDto } from './dto/create-cuota.dto';
import { UpdateCuotaDto } from './dto/update-cuota.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cuota } from './entities/cuota.entity';
import { Contrato } from '../contratos/entities/contrato.entity';
import { create } from 'domain';

@Injectable()
export class CuotasService {
  constructor(
    @InjectRepository(Cuota)
    private cuotaRepository: Repository<Cuota>,
    @InjectRepository(Contrato)
    private contratoRepository: Repository<Contrato>,
  ) {}

  async create(dto: CreateCuotaDto) {

    const contrato =
      await this.contratoRepository.findOneBy({
        idContrato: dto.idContrato,
      });

    if (!contrato) {

      throw new NotFoundException(
        'Contrato no encontrado',
      );
    }
    const cuota =
      this.cuotaRepository.create({

      numeroCuota: dto.numeroCuota,

      montoEsperado: dto.montoEsperado,

      fechaVencimiento: dto.fechaVencimiento,
        estado: 'pendiente',

        contrato,
      });
    return this.cuotaRepository.save(cuota);
  }

  findAll() {
    return `This action returns all cuotas`;
  }

  findOne(id: number) {
    return `This action returns a #${id} cuota`;
  }

  update(id: number, updateCuotaDto: UpdateCuotaDto) {
    return `This action updates a #${id} cuota`;
  }

  remove(id: number) {
    return `This action removes a #${id} cuota`;
  }
}
