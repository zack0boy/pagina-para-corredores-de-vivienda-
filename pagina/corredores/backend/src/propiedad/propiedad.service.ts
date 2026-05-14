import {Injectable,NotFoundException} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePropiedadDto } from './dto/create-propiedad.dto';
import { UpdatePropiedadDto } from './dto/update-propiedad.dto';
import { Propiedad } from './entities/propiedad.entity';

@Injectable()
export class PropiedadService {

  constructor(
    @InjectRepository(Propiedad)
    private propiedadRepository: Repository<Propiedad>,
  ) {}

  create(createPropiedadDto: CreatePropiedadDto) {

    const propiedad =
      this.propiedadRepository.create({
        ...createPropiedadDto,
      });

    return this.propiedadRepository.save(propiedad);
  }

  findAll() {
    return this.propiedadRepository.find();
  }

  async findOne(id: number) {

    const propiedad =
      await this.propiedadRepository.findOne({
        where: {
          idPropiedad: id,
        },
      });

    if (!propiedad) {
      throw new NotFoundException(
        'Propiedad no encontrada',
      );
    }

    return propiedad;
  }

  async update(
    id: number,
    updatePropiedadDto: UpdatePropiedadDto,
  ) {

    await this.findOne(id);

    await this.propiedadRepository.update(
      {
        idPropiedad: id,
      },
      updatePropiedadDto,
    );

    return this.findOne(id);
  }

  async remove(id: number) {

    await this.findOne(id);

    await this.propiedadRepository.delete({
      idPropiedad: id,
    });

    return {
      message: 'Propiedad eliminada',
    };
  }
}