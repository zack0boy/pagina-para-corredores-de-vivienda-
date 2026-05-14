import { Entity, Column, PrimaryGeneratedColumn, PrimaryColumn } from 'typeorm';

@Entity({ name: 'propiedad' })
export class Propiedad {

  @PrimaryGeneratedColumn({
    name: 'id_propiedad',
  })
  idPropiedad!: number;

  @Column({
    name: 'id_corredor',
  })
  idCorredor!: number;

  @Column({
    name: 'titulo',
  })
  titulo!: string;

  @Column({
    name: 'descripcion',
    nullable: true,
  })
  descripcion!: string;

  @Column({
    name: 'direccion',
  })
  direccion!: string;

  @Column({
    name: 'precio',
    type: 'numeric',
  })
  precio!: number;

  @Column({
    name: 'tipo_propiedad',
  })
  tipoPropiedad!: string;

  @Column({
    name: 'operacion',
  })
  operacion!: string;

  @Column({
    name: 'estado',
    default: 'disponible',
  })
  estado!: string;
}