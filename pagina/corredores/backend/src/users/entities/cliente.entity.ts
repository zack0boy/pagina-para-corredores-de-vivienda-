import { Entity, Column, PrimaryGeneratedColumn, PrimaryColumn,OneToOne,JoinColumn, OneToMany, } from 'typeorm';
import { Role } from '../../common/enums/roles.enum';
import { Reserva } from '../../reservas/entities/reserva.entity';
import { UsersGoogle } from './users_google.entity';

@Entity({ name: 'cliente' })
export class Cliente {

  @PrimaryColumn({ name: 'id_usuario' })
  idUsuario!: number;

  @Column({ name: 'telefono', nullable: true })
  telefono!: string;

  @Column({ name: 'rut' })
  rut!: string;

  @OneToMany(()=> Reserva , reserva => reserva.cliente)
  reservas!: Reserva[];

  @OneToOne(() => UsersGoogle)
  @JoinColumn({ name: 'id_usuario' })
  usuarioGoogle!: UsersGoogle;

}

