import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { Corredor } from '../../user/entities/corredor.entity';
import { PropiedadImagen } from './propiedad-imagen.entity';
import { Reserva } from '../../transaction/entities/reserva.entity';
import { TipoOperacion, EstadoPropiedad } from '../../../common/enums/estado.enum';

@Entity({ name: 'propiedad' })
export class Propiedad {
  @PrimaryGeneratedColumn({ name: 'id_propiedad' })
  idPropiedad!: number;

  @Column({ name: 'id_corredor' })
  idCorredor!: number;

  @Column({ name: 'titulo', length: 200 })
  titulo!: string;

  @Column({ name: 'descripcion', type: 'text', nullable: true })
  descripcion?: string;

  @Column({ name: 'direccion', length: 255 })
  direccion!: string;

  @Column({ name: 'precio', type: 'numeric', precision: 15, scale: 2 })
  precio!: number;

  @Column({ name: 'tipo_propiedad', length: 50, nullable: true })
  tipoPropiedad?: string;

  @Column({ name: 'operacion', type: 'enum', enum: TipoOperacion })
  operacion!: TipoOperacion;

  @Column({
    name: 'estado',
    type: 'enum',
    enum: EstadoPropiedad,
    default: EstadoPropiedad.DISPONIBLE,
  })
  estado!: EstadoPropiedad;

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt!: Date;

  // Relaciones
  @ManyToOne(() => Corredor, (corredor) => corredor.propiedades, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'id_corredor' })
  corredor!: Corredor;

  @OneToMany(() => PropiedadImagen, (imagen) => imagen.propiedad)
  imagenes!: PropiedadImagen[];

  @OneToMany(() => Reserva, (reserva) => reserva.propiedad)
  reservas!: Reserva[];
}
