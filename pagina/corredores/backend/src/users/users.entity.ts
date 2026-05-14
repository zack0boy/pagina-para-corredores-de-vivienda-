import { Entity, Column, PrimaryGeneratedColumn, PrimaryColumn } from 'typeorm';
import { Role } from '../common/enums/roles.enum';

@Entity({ name: 'users_google' })
export class UsersGoogle {
  @PrimaryGeneratedColumn({ name: 'id' })
  id!: number;
  
  @Column({ name: 'email' })
  email!: string;

  @Column({ name: 'nombre' })
  nombre!: string;
  
  @Column({ name: 'foto', nullable: true })
  foto!: string;

  @Column({
    name: 'role',
    type: 'enum',
    enum: Role,
    default: Role.CLIENT,
  })
  role!: Role;

  @Column({ name: 'estado' })
  estado!: string;
  
  @Column({ name: 'created_at' })
  createdAt!: Date;

  @Column({ name: 'google_id', unique: true, nullable: true })
  googleId!: string;

}

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