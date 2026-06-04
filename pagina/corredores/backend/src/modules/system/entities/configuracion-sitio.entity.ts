import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity({ name: 'configuracion_sitio' })
export class ConfiguracionSitio {
  @PrimaryGeneratedColumn({ name: 'id_config' })
  idConfig!: number;

  @Column({ name: 'clave', length: 100, unique: true })
  clave!: string;

  @Column({ name: 'valor', type: 'text' })
  valor!: string;

  @Column({ name: 'descripcion', type: 'text', nullable: true })
  descripcion?: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt!: Date;
}
