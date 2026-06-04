import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Reserva } from './entities/reserva.entity';
import { Contrato } from './entities/contrato.entity';
import { Cuota } from './entities/cuota.entity';
import { Pago } from './entities/pago.entity';
import { TransactionService } from './services/transaction.service';
import { TransactionController } from './transaction.controller';
import { PropertyModule } from '../property/property.module';
import { UserModule } from '../user/user.module';
import { GoogleCalendarModule } from '../../google-calendar/google-calendar.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Reserva, Contrato, Cuota, Pago]),
    PropertyModule,
    UserModule,
    GoogleCalendarModule,
  ],
  providers: [TransactionService],
  controllers: [TransactionController],
  exports: [TransactionService, TypeOrmModule],
})
export class TransactionModule {}
