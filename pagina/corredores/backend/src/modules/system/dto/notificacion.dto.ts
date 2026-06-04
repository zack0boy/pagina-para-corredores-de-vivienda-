import { IsString, IsNumber, IsBoolean, IsOptional, Length } from 'class-validator';

export class CreateNotificacionDto {
  @IsNumber()
  idUsuario!: number;

  @IsString()
  @Length(1, 1000)
  mensaje!: string;

  @IsOptional()
  @IsString()
  @Length(1, 50)
  tipo?: string;

  @IsOptional()
  @IsNumber()
  idReferencia?: number;
}

export class NotificacionResponseDto {
  idNotificacion!: number;
  idUsuario!: number;
  mensaje!: string;
  tipo?: string;
  leido!: boolean;
  fecha!: Date;
}
