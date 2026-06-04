import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppService } from './app.service';

import { AuthModule } from './auth/auth.module';
<<<<<<< HEAD
import { GoogleCalendarModule } from './google-calendar/google-calendar.module';
import { CloudinaryModule } from './cloudinary/cloudinary.module';

// Módulos modularizados (arquitectura nueva)
import { UserModule } from './modules/user/user.module';
import { PropertyModule } from './modules/property/property.module';
import { TransactionModule } from './modules/transaction/transaction.module';
import { SystemModule } from './modules/system/system.module';
import { typeormConfig } from './database/typeorm.config';
=======
import { UsersModule } from './users/users.module';
import { CuotasModule } from './cuotas/cuotas.module';
import { NotificacionModule } from './notificacion/notificacion.module';
>>>>>>> 0349e4f84f301bb01d16d3c44f51bc9f3f59bd93

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

<<<<<<< HEAD
    // Módulos de negocio (arquitectura nueva)
    UserModule,
    PropertyModule,
    TransactionModule,
    SystemModule,
=======
    CuotasModule,
    

    ContratosModule,
    

    PagosModule,
    

    NotificacionModule,
>>>>>>> 0349e4f84f301bb01d16d3c44f51bc9f3f59bd93
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
