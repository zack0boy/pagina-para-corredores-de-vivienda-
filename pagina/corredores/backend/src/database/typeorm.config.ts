import { TypeOrmModuleAsyncOptions, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';

// Entidades
import { Usuario } from '../modules/user/entities/usuario.entity';
import { Cliente } from '../modules/user/entities/cliente.entity';
import { Corredor } from '../modules/user/entities/corredor.entity';
import { UsersGoogle } from '../modules/user/entities/users-google.entity';
import { Propiedad } from '../modules/property/entities/propiedad.entity';
import { PropiedadImagen } from '../modules/property/entities/propiedad-imagen.entity';
import { Reserva } from '../modules/transaction/entities/reserva.entity';
import { Contrato } from '../modules/transaction/entities/contrato.entity';
import { Cuota } from '../modules/transaction/entities/cuota.entity';
import { Pago } from '../modules/transaction/entities/pago.entity';
import { Notificacion } from '../modules/system/entities/notificacion.entity';
import { HistorialCambios } from '../modules/system/entities/historial-cambios.entity';
import { ConfiguracionSitio } from '../modules/system/entities/configuracion-sitio.entity';

// Subscribers
import { HistorialSubscriber } from '../common/subscribers/historial.subscriber';

export const typeormConfig: TypeOrmModuleAsyncOptions = {
  useFactory: async (configService: ConfigService): Promise<TypeOrmModuleOptions> => ({
    type: 'postgres',
    host: configService.getOrThrow<string>('DB_HOST'),
    port: parseInt(configService.getOrThrow<string>('DB_PORT'), 10),
    username: configService.getOrThrow<string>('DB_USERNAME'),
    password: configService.getOrThrow<string>('DB_PASSWORD'),
    database: configService.getOrThrow<string>('DB_NAME'),
    entities: [
      Usuario,
      Cliente,
      Corredor,
      UsersGoogle,
      Propiedad,
      PropiedadImagen,
      Reserva,
      Contrato,
      Cuota,
      Pago,
      Notificacion,
      HistorialCambios,
      ConfiguracionSitio,
    ],
    subscribers: [HistorialSubscriber],
    synchronize: process.env.NODE_ENV === 'development',
    logging: process.env.NODE_ENV === 'development',
    ssl: {
      rejectUnauthorized: false,
    },
  }),
  inject: [ConfigService],
};
