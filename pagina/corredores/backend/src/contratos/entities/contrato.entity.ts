import {Entity,Column,PrimaryGeneratedColumn,OneToOne,JoinColumn,} from 'typeorm';
import { Reserva } from '../../reservas/entities/reserva.entity';

@Entity({ name: 'contrato' })
export class Contrato {

  @PrimaryGeneratedColumn({
    name: 'id_contrato',
  })
  idContrato!: number;

  @Column({
    name: 'monto_total',
    type: 'numeric',
  })
  montoTotal!: number;

  @Column({
    name: 'fecha_inicio',
  })
  fechaInicio!: Date;

  @Column({
    name: 'fecha_fin',
    nullable: true,
  })
  fechaFin!: Date;

  @Column({
    name: 'estado',
    default: 'activo',
  })
  estado!: string;

  @OneToOne(() => Reserva)
  @JoinColumn({
    name: 'id_reserva',
  })
  reserva!: Reserva;
}