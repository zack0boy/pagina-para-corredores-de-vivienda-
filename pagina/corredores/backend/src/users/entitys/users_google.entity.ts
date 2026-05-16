import { Entity, Column, PrimaryGeneratedColumn, PrimaryColumn,OneToOne,JoinColumn, } from 'typeorm';
import { Role } from '../../common/enums/roles.enum';
import { Corredor } from './corredor.entity';

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
  @OneToOne(() => Corredor, (corredor) => corredor.usuarioGoogle)
  corredor!: Corredor;
}