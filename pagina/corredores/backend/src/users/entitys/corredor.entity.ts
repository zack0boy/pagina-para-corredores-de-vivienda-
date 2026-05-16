import {
  Entity,
  Column,
  PrimaryColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';

import { UsersGoogle } from './users_google.entity';

@Entity({ name: 'corredor' })
export class Corredor {

  @PrimaryColumn({ name: 'id_usuario' })
  idUsuario!: number;

  @Column({ name: 'licencia_profesional' })
  licenciaProfesional!: string;

  @OneToOne(() => UsersGoogle)
  @JoinColumn({ name: 'id_usuario' })
  usuarioGoogle!: UsersGoogle;
}