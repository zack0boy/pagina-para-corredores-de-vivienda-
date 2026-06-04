import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfiguracionSitio } from './entities/configuracion-sitio.entity';
import { Notificacion } from './entities/notificacion.entity';
import { HistorialCambios } from './entities/historial-cambios.entity';
import { SystemService } from './services/system.service';
import { SystemController } from './system.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([ConfiguracionSitio, Notificacion, HistorialCambios]),
  ],
  providers: [SystemService],
  controllers: [SystemController],
  exports: [SystemService, TypeOrmModule],
})
export class SystemModule {}
