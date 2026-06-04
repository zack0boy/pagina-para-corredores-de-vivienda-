import { Entity, Column, PrimaryGeneratedColumn, PrimaryColumn,OneToOne,JoinColumn, } from 'typeorm';
import { Role } from '../../common/enums/roles.enum';
import { Corredor } from './corredor.entity';

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

  corredor!: Corredor;
}

