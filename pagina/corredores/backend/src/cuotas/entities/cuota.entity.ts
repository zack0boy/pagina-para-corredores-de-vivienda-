import {Entity,Column,PrimaryGeneratedColumn,ManyToOne,JoinColumn,} from 'typeorm';
import { Contrato } from '../../contratos/entities/contrato.entity';

@Entity({ name: 'cuota' })
export class Cuota {

  @PrimaryGeneratedColumn({
    name: 'id_cuota',
  })
  idCuota!: number;

  @Column({
    name: 'numero_cuota',
  })
  numeroCuota!: number;

  @Column({
    name: 'monto_esperado',
    type: 'numeric',
  })
  montoEsperado!: number;

  @Column({
    name: 'fecha_vencimiento',
  })
  fechaVencimiento!: Date;

  @Column({
    name: 'estado',
    default: 'pendiente',
  })
  estado!: string;

  @ManyToOne(() => Contrato)
  @JoinColumn({
    name: 'id_contrato',
  })
  contrato!: Contrato;
}