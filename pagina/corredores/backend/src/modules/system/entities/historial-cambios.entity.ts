import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Usuario } from '../../user/entities/usuario.entity';

@Entity({ name: 'historial_cambios' })
export class HistorialCambios {
  @PrimaryGeneratedColumn({ name: 'id_historia' })
  idHistoria!: number;

  @Column({ name: 'entidad_afectada', length: 50 })
  entidadAfectada!: string;

  @Column({ name: 'id_registro' })
  idRegistro!: number;

  @Column({ name: 'accion', length: 50 })
  accion!: string;

  @Column({ name: 'valores_anteriores', type: 'jsonb', nullable: true })
  valoresAnteriores?: any;

  @Column({ name: 'valores_nuevos', type: 'jsonb', nullable: true })
  valoresNuevos?: any;

  @Column({ name: 'id_usuario', nullable: true })
  idUsuario?: number;

  @CreateDateColumn({ name: 'fecha' })
  fecha!: Date;

  // Relaciones
  @ManyToOne(() => Usuario, (usuario) => usuario.historialCambios, {
    onDelete: 'SET NULL',
    nullable: true,
  })
  @JoinColumn({ name: 'id_usuario' })
  usuario?: Usuario;
}
