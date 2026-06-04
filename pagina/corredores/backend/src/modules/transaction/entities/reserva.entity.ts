import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne, JoinColumn, OneToOne } from 'typeorm';
import { Propiedad } from '../../property/entities/propiedad.entity';
import { Cliente } from '../../user/entities/cliente.entity';
import { Contrato } from './contrato.entity';
import { EstadoGeneral } from '../../../common/enums/estado.enum';

@Entity({ name: 'reserva' })
export class Reserva {
  @PrimaryGeneratedColumn({ name: 'id_reserva' })
  idReserva!: number;

  @Column({ name: 'id_propiedad' })
  idPropiedad!: number;

  @Column({ name: 'id_cliente' })
  idCliente!: number;

  @CreateDateColumn({ name: 'fecha_reserva' })
  fechaReserva!: Date;

  @Column({ name: 'monto_reserva', type: 'numeric', precision: 15, scale: 2, nullable: true })
  montoReserva?: number;

  @Column({
    name: 'estado',
    type: 'enum',
    enum: EstadoGeneral,
    default: EstadoGeneral.PENDIENTE,
  })
  estado!: EstadoGeneral;

  // Relaciones
  @ManyToOne(() => Propiedad, (propiedad) => propiedad.reservas, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'id_propiedad' })
  propiedad!: Propiedad;

  @ManyToOne(() => Cliente, (cliente) => cliente.reservas, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'id_cliente' })
  cliente!: Cliente;

  @OneToOne(() => Contrato, (contrato) => contrato.reserva, { nullable: true })
  contrato?: Contrato;
}
