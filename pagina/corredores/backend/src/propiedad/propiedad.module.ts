import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Propiedad } from './entities/propiedad.entity';
import { PropiedadController } from './propiedad.controller';
import { PropiedadService } from './propiedad.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Propiedad,
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