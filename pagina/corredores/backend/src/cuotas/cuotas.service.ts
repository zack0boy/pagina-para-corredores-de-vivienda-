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

  async findAll() {

  return this.cuotaRepository.find({
    relations: ['contrato'],
  });
}

async findOne(id: number) {

  const cuota =
    await this.cuotaRepository.findOne({
      where: {
        idCuota: id,
      },
      relations: ['contrato'],
    });

  if (!cuota) {

    throw new NotFoundException(
      'Cuota no encontrada',
    );
  }

  return cuota;
}

async update(
  id: number,
  updateCuotaDto: UpdateCuotaDto,
) {

  await this.cuotaRepository.update(
    id,
    updateCuotaDto,
  );

  return {
    message: 'Cuota actualizada',
  };
}

async remove(id: number) {

  await this.cuotaRepository.delete(id);

  return {
    message: 'Cuota eliminada',
  };
}
}
