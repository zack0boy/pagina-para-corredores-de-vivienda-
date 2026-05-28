import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppService } from './app.service';

import { PropiedadModule } from './propiedad/propiedad.module';
import { ReservasModule } from './reservas/reservas.module';
import { ContratosModule } from './contratos/contratos.module';
import { PagosModule } from './pagos/pagos.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { CuotasModule } from './cuotas/cuotas.module';

@Module({
  imports: [
    ConfigModule.forRoot({
    isGlobal: true,
    }),
    PropiedadModule,
    ReservasModule,
    ContratosModule,
    PagosModule,
    AuthModule, 
    UsersModule,
    

    TypeOrmModule.forRoot({
      type: process.env.DB_TYPE as 'postgres',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT || '5432'),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      autoLoadEntities: true,
      synchronize: false,
    }),
    

    CuotasModule,
    

    ContratosModule,
    

    PagosModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
