import { Entity, Column, PrimaryColumn, OneToOne, JoinColumn, CreateDateColumn, OneToMany } from 'typeorm';
import { Usuario } from './usuario.entity';
import { Propiedad } from '../../property/entities/propiedad.entity';

@Entity({ name: 'corredor' })
export class Corredor {
  @PrimaryColumn({ name: 'id_usuario' })
  idUsuario!: number;

  @Column({ name: 'licencia_profesional', length: 50, nullable: true })
  licenciaProfesional?: string;

  @Column({ name: 'descripcion', type: 'text', nullable: true })
  descripcion?: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;

  // Relaciones
  @OneToOne(() => Usuario, (usuario) => usuario.corredor)
  @JoinColumn({ name: 'id_usuario' })
  usuario!: Usuario;

  @OneToMany(() => Propiedad, (propiedad) => propiedad.corredor)
  propiedades!: Propiedad[];
}
