import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { Propiedad } from './propiedad.entity';

@Entity({ name: 'propiedad_imagen' })
export class PropiedadImagen {
  @PrimaryGeneratedColumn({ name: 'id_propiedad_imagen' })
  idPropiedadImagen!: number;

  @Column({ name: 'url_imagen', type: 'text' })
  urlImagen!: string;

  @Column({ name: 'public_id', type: 'text' })
  publicId!: string;

  @ManyToOne(() => Propiedad, (propiedad) => propiedad.imagenes, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'id_propiedad' })
  propiedad!: Propiedad;

  @Column({ name: 'created_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt!: Date;
}