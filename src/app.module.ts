import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppService } from './app.service';

import { PropiedadModule } from './propiedad/propiedad.module';
import { ReservasModule } from './reservas/reservas.module';
import { ContratosModule } from './contratos/contratos.module';
import { PagosModule } from './pagos/pagos.module';
import { PropietarioModule } from './propietario/propietario.module';
import { AuthModule } from './auth/auth.module'; 
import { UsersModule } from './users/users.module';
import { AuthService } from './auth/auth.services';
  
@Module({
  imports: [
    PropiedadModule,
    ReservasModule,
    ContratosModule,
    PagosModule,
    PropietarioModule,
    AuthModule, 
    UsersModule,
    

    TypeOrmModule.forRoot({
      type: 'postgres', 
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '12345',
      database: 'corredores',
      autoLoadEntities: true,
      synchronize: false, 
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
