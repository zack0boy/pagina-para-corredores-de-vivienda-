import {Entity,Column,PrimaryGeneratedColumn,ManyToOne,JoinColumn,} from 'typeorm';
import { UsersGoogle } from '../../users/entitys/users_google.entity';

@Entity({ name: 'reserva' })
export class Reserva {

  @PrimaryGeneratedColumn({
    name: 'id_reserva',
  })
  idReserva!: number;

  @Column({
    name: 'id_propiedad',
  })
  idPropiedad!: number;

  @Column({
    name: 'fecha_reserva',
  })
  fechaReserva!: Date;

  @Column({
    name: 'monto_reserva',
  })
  montoReserva!: number;

  @Column({
    name: 'estado',
  })
  estado!: string;

  @ManyToOne(
    () => UsersGoogle,
    (user) => user.reservas,
  )
  @JoinColumn({
    name: 'id_cliente',
  })
  cliente!: UsersGoogle;
}