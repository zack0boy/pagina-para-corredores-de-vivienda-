import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CloudinaryModule } from '../cloudinary/cloudinary.module';
import { Propiedad } from './entities/propiedad.entity';
import { PropiedadImagen } from './entities/propiedad-imagen.entity';
import { PropiedadController } from './propiedad.controller';
import { PropiedadService } from './propiedad.service';

@Module({
  imports: [
    CloudinaryModule,
    TypeOrmModule.forFeature([
      Propiedad,
      PropiedadImagen,
    ]),
  ],

  controllers: [
    PropiedadController,
  ],

  providers: [
    PropiedadService,
  ],
})
export class PropiedadModule {}