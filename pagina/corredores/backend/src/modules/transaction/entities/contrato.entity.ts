import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, OneToOne, JoinColumn, OneToMany } from 'typeorm';
import { Reserva } from './reserva.entity';
import { Cuota } from './cuota.entity';
import { EstadoGeneral } from '../../../common/enums/estado.enum';

@Entity({ name: 'contrato' })
export class Contrato {
  @PrimaryGeneratedColumn({ name: 'id_contrato' })
  idContrato!: number;

  @Column({ name: 'id_reserva', unique: true })
  idReserva!: number;

  @Column({ name: 'monto_total', type: 'numeric', precision: 15, scale: 2 })
  montoTotal!: number;

  @Column({ name: 'fecha_inicio', type: 'date' })
  fechaInicio!: Date;

  @Column({ name: 'fecha_fin', type: 'date', nullable: true })
  fechaFin?: Date;

  @Column({
    name: 'estado',
    type: 'enum',
    enum: EstadoGeneral,
    default: EstadoGeneral.ACTIVO,
  })
  estado!: EstadoGeneral;

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;

  // Relaciones
  @OneToOne(() => Reserva, (reserva) => reserva.contrato)
  @JoinColumn({ name: 'id_reserva' })
  reserva!: Reserva;

  @OneToMany(() => Cuota, (cuota) => cuota.contrato)
  cuotas!: Cuota[];
}
