import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn, OneToMany } from 'typeorm';
import { Role } from '../../common/enums/roles.enum';
import { Corredor } from './corredor.entity';
import { Reserva } from '../../reservas/entities/reserva.entity';

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

  @Column({ name: 'access_token', nullable: true, type: 'text' })
  accessToken?: string | null;

  @Column({ name: 'refresh_token', nullable: true, type: 'text' })
  refreshToken?: string | null;

  @Column({ name: 'token_expiry_date', nullable: true, type: 'timestamp' })
  tokenExpiryDate?: Date | null;

  @OneToOne(() => Corredor, (corredor) => corredor.usuarioGoogle)
  corredor!: Corredor;
  
  @OneToMany(
  () => Reserva,(reserva) => reserva.cliente,)
  reservas!: Reserva[];

}