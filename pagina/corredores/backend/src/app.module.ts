import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppService } from './app.service';

import { AuthModule } from './auth/auth.module';
import { GoogleCalendarModule } from './google-calendar/google-calendar.module';
import { CloudinaryModule } from './cloudinary/cloudinary.module';

// Módulos modularizados (arquitectura nueva)
import { UserModule } from './modules/user/user.module';
import { PropertyModule } from './modules/property/property.module';
import { TransactionModule } from './modules/transaction/transaction.module';
import { SystemModule } from './modules/system/system.module';
import { typeormConfig } from './database/typeorm.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    // Configuración de TypeORM con TypeOrmModule.forRootAsync
    TypeOrmModule.forRootAsync(typeormConfig),

    // Módulos de infraestructura
    AuthModule,
    GoogleCalendarModule,
    CloudinaryModule,

    // Módulos de negocio (arquitectura nueva)
    UserModule,
    PropertyModule,
    TransactionModule,
    SystemModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
