import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, SelectQueryBuilder } from 'typeorm';
import { Propiedad } from '../entities/propiedad.entity';
import { PropiedadImagen } from '../entities/propiedad-imagen.entity';
import { CreatePropiedadDto, UpdatePropiedadDto, BuscarPropiedadesDto } from '../dto/create-propiedad.dto';
import { CloudinaryService } from '../../../cloudinary/cloudinary.service';

@Injectable()
export class PropertyService {
  constructor(
    @InjectRepository(Propiedad)
    private propiedadRepository: Repository<Propiedad>,
    @InjectRepository(PropiedadImagen)
    private propiedadImagenRepository: Repository<PropiedadImagen>,
    private cloudinaryService: CloudinaryService,
  ) {}

  async create(dto: CreatePropiedadDto): Promise<Propiedad> {
    const propiedad = this.propiedadRepository.create(dto);
    return this.propiedadRepository.save(propiedad);
  }

  async findAll(filters: BuscarPropiedadesDto): Promise<{ data: Propiedad[]; total: number }> {
    const query = this.buildSearchQuery(filters);

    const [data, total] = await query
      .skip((filters.pagina! - 1) * filters.limite!)
      .take(filters.limite!)
      .getManyAndCount();

    return { data, total };
  }

  async findOne(id: number): Promise<Propiedad> {
    const propiedad = await this.propiedadRepository.findOne({
      where: { idPropiedad: id },
      relations: ['imagenes', 'corredor', 'reservas'],
    });

    if (!propiedad) {
      throw new NotFoundException(`Propiedad con ID ${id} no encontrada`);
    }

    return propiedad;
  }

  async update(id: number, dto: UpdatePropiedadDto): Promise<Propiedad> {
    const propiedad = await this.findOne(id);
    Object.assign(propiedad, dto);
    return this.propiedadRepository.save(propiedad);
  }

  async remove(id: number): Promise<void> {
    const propiedad = await this.findOne(id);
    await this.propiedadRepository.remove(propiedad);
  }

  async uploadImage(id: number, file: Express.Multer.File): Promise<PropiedadImagen> {
    const propiedad = await this.findOne(id);

    if (!file || !file.buffer) {
      throw new BadRequestException('Archivo de imagen inválido');
    }

    const uploadResult = await this.cloudinaryService.uploadImage(file, 'propiedades');

    const imagen = this.propiedadImagenRepository.create({
      idPropiedad: id,
      urlImagen: uploadResult.secureUrl,
      esPrincipal: false,
    });

    return this.propiedadImagenRepository.save(imagen);
  }

  async setMainImage(idImagen: number): Promise<PropiedadImagen> {
    const imagen = await this.propiedadImagenRepository.findOne({
      where: { idImagen },
      relations: ['propiedad'],
    });

    if (!imagen) {
      throw new NotFoundException('Imagen no encontrada');
    }

    // Desmarcar todas las imágenes de esta propiedad
    await this.propiedadImagenRepository.update(
      { idPropiedad: imagen.idPropiedad },
      { esPrincipal: false },
    );

    // Marcar esta como principal
    imagen.esPrincipal = true;
    return this.propiedadImagenRepository.save(imagen);
  }

  async deleteImage(idImagen: number): Promise<void> {
    const imagen = await this.propiedadImagenRepository.findOne({ where: { idImagen } });
    if (!imagen) {
      throw new NotFoundException('Imagen no encontrada');
    }

    await this.propiedadImagenRepository.remove(imagen);
  }

  private buildSearchQuery(filters: BuscarPropiedadesDto): SelectQueryBuilder<Propiedad> {
    let query = this.propiedadRepository.createQueryBuilder('propiedad');

    if (filters.precioMin !== undefined) {
      query = query.andWhere('propiedad.precio >= :precioMin', { precioMin: filters.precioMin });
    }

    if (filters.precioMax !== undefined) {
      query = query.andWhere('propiedad.precio <= :precioMax', { precioMax: filters.precioMax });
    }

    if (filters.tipo) {
      query = query.andWhere('propiedad.tipoPropiedad = :tipo', { tipo: filters.tipo });
    }

    if (filters.estado) {
      query = query.andWhere('propiedad.estado = :estado', { estado: filters.estado });
    }

    if (filters.operacion) {
      query = query.andWhere('propiedad.operacion = :operacion', { operacion: filters.operacion });
    }

    query = query.leftJoinAndSelect('propiedad.imagenes', 'imagenes').orderBy('propiedad.createdAt', 'DESC');

    return query;
  }
}
