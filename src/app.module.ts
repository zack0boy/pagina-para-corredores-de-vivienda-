import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppService } from './app.service';
import { PropiedadModule } from './propiedad/propiedad.module';
import { ReservasModule } from './reservas/reservas.module';
import { ContratosModule } from './contratos/contratos.module';
import { PagosModule } from './pagos/pagos.module';
import { PropietarioModule } from './propietario/propietario.module';
import { AuthService } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { Cliente } from './users/users.entity';

@Module({
  imports: [
    PropiedadModule, 
    ReservasModule, 
    ContratosModule, 
    PagosModule, 
    PropietarioModule, 
    AuthService, 
    TypeOrmModule.forRoot({ // Configuración de la conexión a la base de datos
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'test',
      entities: [Cliente],
      synchronize: true,
    }),
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
