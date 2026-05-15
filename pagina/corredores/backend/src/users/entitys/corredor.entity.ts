import { Entity, Column, PrimaryGeneratedColumn, PrimaryColumn,OneToOne,JoinColumn, } from 'typeorm';
import { Role } from '../../common/enums/roles.enum';
import { Usuario } from './usuario.entity';
@Entity({ name: 'corredor' })
export class Corredor {
  
  @PrimaryColumn({ name: 'id_usuario' })
  idUsuario!: number;
  
  @Column({ name: 'licencia_profesional' })
  licenciaProfesional!: string;
  
  @OneToOne(() => Usuario)
  @JoinColumn({ name: 'id_usuario' })
  usuario!: Usuario;
}