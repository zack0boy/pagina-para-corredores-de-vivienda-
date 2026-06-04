import { Module } from '@nestjs/common';
import { NotificacionService } from './notificacion.service';
import { NotificacionController } from './notificacion.controller';
import { Notificacion } from './entities/notificacion.entity';
import { TypeOrmModule } from '@nestjs/typeorm/dist/typeorm.module';
import { UsersGoogle } from '../users/entities/users_google.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Notificacion, UsersGoogle])],
  controllers: [NotificacionController],
  providers: [NotificacionService],
})
export class NotificacionModule {}
