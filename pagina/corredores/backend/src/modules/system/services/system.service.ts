import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ConfiguracionSitio } from '../entities/configuracion-sitio.entity';
import { CreateConfiguracionDto, UpdateConfiguracionDto } from '../dto/configuracion.dto';

@Injectable()
export class SystemService {
  constructor(
    @InjectRepository(ConfiguracionSitio)
    private configuracionRepository: Repository<ConfiguracionSitio>,
  ) {}

  async createConfiguracion(dto: CreateConfiguracionDto): Promise<ConfiguracionSitio> {
    // Verificar que no exista la clave
    const existing = await this.configuracionRepository.findOne({
      where: { clave: dto.clave },
    });

    if (existing) {
      throw new ConflictException(`La configuración con clave "${dto.clave}" ya existe`);
    }

    const config = this.configuracionRepository.create(dto);
    return this.configuracionRepository.save(config);
  }

  async getConfiguracion(clave: string): Promise<ConfiguracionSitio> {
    const config = await this.configuracionRepository.findOne({
      where: { clave },
    });

    if (!config) {
      throw new NotFoundException(`Configuración con clave "${clave}" no encontrada`);
    }

    return config;
  }

  async getConfiguracionById(idConfig: number): Promise<ConfiguracionSitio> {
    const config = await this.configuracionRepository.findOne({
      where: { idConfig },
    });

    if (!config) {
      throw new NotFoundException('Configuración no encontrada');
    }

    return config;
  }

  async getAllConfiguraciones(): Promise<ConfiguracionSitio[]> {
    return this.configuracionRepository.find();
  }

  async updateConfiguracion(idConfig: number, dto: UpdateConfiguracionDto): Promise<ConfiguracionSitio> {
    const config = await this.getConfiguracionById(idConfig);
    Object.assign(config, dto);
    return this.configuracionRepository.save(config);
  }

  async updateConfiguracionByClave(clave: string, dto: UpdateConfiguracionDto): Promise<ConfiguracionSitio> {
    const config = await this.getConfiguracion(clave);
    Object.assign(config, dto);
    return this.configuracionRepository.save(config);
  }

  async deleteConfiguracion(idConfig: number): Promise<void> {
    const config = await this.getConfiguracionById(idConfig);
    await this.configuracionRepository.remove(config);
  }

  async getValor(clave: string): Promise<string> {
    const config = await this.getConfiguracion(clave);
    return config.valor;
  }

  async setValor(clave: string, valor: string): Promise<void> {
    const config = await this.configuracionRepository.findOne({
      where: { clave },
    });

    if (config) {
      config.valor = valor;
      await this.configuracionRepository.save(config);
    } else {
      const newConfig = this.configuracionRepository.create({
        clave,
        valor,
      });
      await this.configuracionRepository.save(newConfig);
    }
  }
}
