import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { Contrato } from './contrato.entity';
import { Pago } from './pago.entity';
import { EstadoGeneral } from '../../../common/enums/estado.enum';

@Entity({ name: 'cuota' })
export class Cuota {
  @PrimaryGeneratedColumn({ name: 'id_cuota' })
  idCuota!: number;

  @Column({ name: 'id_contrato' })
  idContrato!: number;

  @Column({ name: 'numero_cuota' })
  numeroCuota!: number;

  @Column({ name: 'monto_esperado', type: 'numeric', precision: 15, scale: 2 })
  montoEsperado!: number;

  @Column({ name: 'fecha_vencimiento', type: 'date' })
  fechaVencimiento!: Date;

  @Column({
    name: 'estado',
    type: 'enum',
    enum: EstadoGeneral,
    default: EstadoGeneral.PENDIENTE,
  })
  estado!: EstadoGeneral;

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;

  // Relaciones
  @ManyToOne(() => Contrato, (contrato) => contrato.cuotas, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'id_contrato' })
  contrato!: Contrato;

  @OneToMany(() => Pago, (pago) => pago.cuota)
  pagos!: Pago[];
}
