import { Entity, Column, PrimaryGeneratedColumn, PrimaryColumn } from 'typeorm';

@Entity({ name: 'usuario' })
export class Usuario {
  @PrimaryGeneratedColumn({ name: 'id_usuario' })
  idUsuario!: number;

  @Column({ name: 'nombre' })
  nombre!: string;

  @Column({ name: 'email' })
  email!: string;

  @Column({ name: 'password' })
  password!: string;

  @Column({ name: 'rol' })
  rol!: string;

  @Column({
    name: 'estado',
    type: 'enum',
    enum: ['activo', 'inactivo', 'pendiente'],
    default: 'activo',
  })
  estado!: string;
}

@Entity({ name: 'cliente' })
export class Cliente {
  @PrimaryColumn({ name: 'id_usuario' })
  idUsuario!: number;

  @Column({ name: 'telefono', nullable: true })
  telefono!: string;

  @Column({ name: 'rut' })
  rut!: string;
}