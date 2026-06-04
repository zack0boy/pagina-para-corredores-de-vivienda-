import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Propiedad } from './propiedad.entity';

@Entity({ name: 'propiedad_imagen' })
export class PropiedadImagen {
  @PrimaryGeneratedColumn({ name: 'id_imagen' })
  idImagen!: number;

  @Column({ name: 'id_propiedad' })
  idPropiedad!: number;

  @Column({ name: 'url_imagen', type: 'text' })
  urlImagen!: string;

  @Column({ name: 'es_principal', default: false })
  esPrincipal!: boolean;

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;

  // Relaciones
  @ManyToOne(() => Propiedad, (propiedad) => propiedad.imagenes, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'id_propiedad' })
  propiedad!: Propiedad;
}
