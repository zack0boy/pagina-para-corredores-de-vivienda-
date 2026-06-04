import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  OneToMany,
  Unique,
} from 'typeorm';

import { EstadoGeneral, RolUsuario } from '../../../common/enums/estado.enum';
import { Role } from '../../../common/enums/roles.enum';

import { Cliente } from './cliente.entity';
import { Corredor } from './corredor.entity';
import { UsersGoogle } from './users-google.entity';

import { Notificacion } from '../../system/entities/notificacion.entity';
import { HistorialCambios } from '../../system/entities/historial-cambios.entity';

@Entity({ name: 'usuario' })
@Unique(['email'])
export class Usuario {
  @PrimaryGeneratedColumn({ name: 'id_usuario' })
  idUsuario!: number;

  @Column({ name: 'nombre', length: 100 })
  nombre!: string;

  @Column({ name: 'email', length: 150 })
  email!: string;

  @Column({ name: 'password', length: 255 })
  password!: string;

  @Column({ name: 'rol', type: 'enum', enum: RolUsuario })
  rol!: RolUsuario;

  @Column({
    name: 'estado',
    type: 'enum',
    enum: EstadoGeneral,
    default: EstadoGeneral.ACTIVO,
  })
  estado!: EstadoGeneral;

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt!: Date;

  // Relaciones
  @OneToOne(() => Cliente, (cliente) => cliente.usuario, { nullable: true })
  cliente?: Cliente;

  @OneToOne(() => Corredor, (corredor) => corredor.usuario, { nullable: true })
  corredor?: Corredor;

  @OneToOne(() => UsersGoogle, (userGoogle) => userGoogle.usuario, { nullable: true })
  usersGoogle?: UsersGoogle;

  @OneToMany(() => Notificacion, (notificacion) => notificacion.usuario)
  notificaciones!: Notificacion[];

  @OneToMany(() => HistorialCambios, (historial) => historial.usuario)
  historialCambios!: HistorialCambios[];
}
