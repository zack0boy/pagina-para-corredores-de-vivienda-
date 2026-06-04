import { Entity, Column, PrimaryColumn, OneToOne, JoinColumn, CreateDateColumn, OneToMany } from 'typeorm';
import { Usuario } from './usuario.entity';
import { Reserva } from '../../transaction/entities/reserva.entity';
import { Pago } from '../../transaction/entities/pago.entity';

@Entity({ name: 'cliente' })
export class Cliente {
  @PrimaryColumn({ name: 'id_usuario' })
  idUsuario!: number;

  @Column({ name: 'telefono', length: 20, nullable: true })
  telefono?: string;

  @Column({ name: 'rut', length: 12, unique: true })
  rut!: string;

  @Column({ name: 'direccion', type: 'text', nullable: true })
  direccion?: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;

  // Relaciones
  @OneToOne(() => Usuario, (usuario) => usuario.cliente)
  @JoinColumn({ name: 'id_usuario' })
  usuario!: Usuario;

  @OneToMany(() => Reserva, (reserva) => reserva.cliente)
  reservas!: Reserva[];

  @OneToMany(() => Pago, (pago) => pago.cliente)
  pagos!: Pago[];
}
