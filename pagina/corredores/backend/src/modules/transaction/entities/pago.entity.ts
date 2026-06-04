import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Cuota } from './cuota.entity';
import { Cliente } from '../../user/entities/cliente.entity';
import { Usuario } from '../../user/entities/usuario.entity';
import { MetodoPago } from '../../../common/enums/estado.enum';

@Entity({ name: 'pago' })
export class Pago {
  @PrimaryGeneratedColumn({ name: 'id_pago' })
  idPago!: number;

  @Column({ name: 'id_cuota' })
  idCuota!: number;

  @Column({ name: 'id_cliente' })
  idCliente!: number;

  @Column({ name: 'id_usuario_receptor' })
  idUsuarioReceptor!: number;

  @Column({ name: 'monto_pagado', type: 'numeric', precision: 15, scale: 2 })
  montoPagado!: number;

  @Column({ name: 'metodo', type: 'enum', enum: MetodoPago })
  metodo!: MetodoPago;

  @CreateDateColumn({ name: 'fecha_pago' })
  fechaPago!: Date;

  @Column({ name: 'comprobante_url', type: 'text', nullable: true })
  comprobanteUrl?: string;

  // Relaciones
  @ManyToOne(() => Cuota, (cuota) => cuota.pagos, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'id_cuota' })
  cuota!: Cuota;

  @ManyToOne(() => Cliente, (cliente) => cliente.pagos, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'id_cliente' })
  cliente!: Cliente;

  @ManyToOne(() => Usuario, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'id_usuario_receptor' })
  usuarioReceptor!: Usuario;
}
