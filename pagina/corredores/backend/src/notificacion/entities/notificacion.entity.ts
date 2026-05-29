import {Entity,Column,PrimaryGeneratedColumn,ManyToOne,JoinColumn,} from 'typeorm';
import { Usuario } from '../../users/entities/usuario.entity';
import { UsersGoogle } from '../../users/entities/users_google.entity';
@Entity({ name: 'notificacion' })
export class Notificacion {

 @PrimaryGeneratedColumn({
    name: 'id_notificacion',
  })
  idNotificacion!: number;

  @ManyToOne(() => UsersGoogle)
  @JoinColumn({
    name: 'id_usuario',
  })
  usuario!: UsersGoogle;

  @Column()
  mensaje!: string;

  @Column({
    nullable: true,
  })
  tipo!: string;

  @Column({
    name: 'id_referencia',
    nullable: true,
  })
  idReferencia!: number;

  @Column({
    default: false,
  })
  leido!: boolean;

  @Column({
    default: () => 'CURRENT_TIMESTAMP',
  })
  fecha!: Date;

}
