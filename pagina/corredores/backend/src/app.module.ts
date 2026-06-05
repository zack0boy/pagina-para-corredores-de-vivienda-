import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { typeormConfig } from './database/typeorm.config';

// Infraestructura
import { AuthModule } from './auth/auth.module';
import { GoogleCalendarModule } from './google-calendar/google-calendar.module';
import { CloudinaryModule } from './cloudinary/cloudinary.module';

// Arquitectura nueva
import { UserModule } from './modules/user/user.module';
import { PropertyModule } from './modules/property/property.module';
import { TransactionModule } from './modules/transaction/transaction.module';
import { SystemModule } from './modules/system/system.module';

// Arquitectura antigua (todavía existente)
import { CuotasModule } from './cuotas/cuotas.module';
import { NotificacionModule } from './notificacion/notificacion.module';

@Module({
  imports: [
  ConfigModule.forRoot({
    isGlobal: true,
  }),

  TypeOrmModule.forRootAsync(typeormConfig),

  // Infraestructura
  AuthModule,
  GoogleCalendarModule,
  CloudinaryModule,

  // Arquitectura nueva
  UserModule,
  PropertyModule,
  TransactionModule,
  SystemModule,

  // Arquitectura antigua
  CuotasModule,
  NotificacionModule,
],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
