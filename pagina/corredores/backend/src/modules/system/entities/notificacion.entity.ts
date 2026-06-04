import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Usuario } from '../../user/entities/usuario.entity';

@Entity({ name: 'notificacion' })
export class Notificacion {
  @PrimaryGeneratedColumn({ name: 'id_notificacion' })
  idNotificacion!: number;

  @Column({ name: 'id_usuario' })
  idUsuario!: number;

  @Column({ name: 'mensaje', type: 'text' })
  mensaje!: string;

  @Column({ name: 'tipo', length: 50, nullable: true })
  tipo?: string;

  @Column({ name: 'id_referencia', nullable: true })
  idReferencia?: number;

  @Column({ name: 'leido', default: false })
  leido!: boolean;

  @CreateDateColumn({ name: 'fecha' })
  fecha!: Date;

  // Relaciones
  @ManyToOne(() => Usuario, (usuario) => usuario.notificaciones, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'id_usuario' })
  usuario!: Usuario;
}
