import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Propiedad } from './entities/propiedad.entity';
import { PropiedadImagen } from './entities/propiedad-imagen.entity';
import { PropertyService } from './services/property.service';
import { PropertyController } from './property.controller';
import { CloudinaryModule } from '../../cloudinary/cloudinary.module';

@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forFeature([Propiedad, PropiedadImagen]),
    CloudinaryModule,
  ],
  providers: [PropertyService],
  controllers: [PropertyController],
  exports: [PropertyService, TypeOrmModule],
})
export class PropertyModule {}
