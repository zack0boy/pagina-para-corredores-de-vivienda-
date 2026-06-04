import { IsNumber, IsDate, IsOptional, IsEnum, Min, IsString, Length } from 'class-validator';
import { EstadoGeneral, MetodoPago } from '../../../common/enums/estado.enum';
import { Type } from 'class-transformer';

export class CreateReservaDto {
  @IsNumber()
  @Type(() => Number)
  idPropiedad!: number;

  @IsNumber()
  @Type(() => Number)
  idCliente!: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  @Type(() => Number)
  montoReserva?: number;
}

export class CreateContratoDto {
  @IsNumber()
  @Type(() => Number)
  idReserva!: number;

  @IsNumber()
  @Min(0.01)
  @Type(() => Number)
  montoTotal!: number;

  @IsDate()
  @Type(() => Date)
  fechaInicio!: Date;

  @IsOptional()
  @IsDate()
  @Type(() => Date)
  fechaFin?: Date;
}

export class CreateCuotaDto {
  @IsNumber()
  @Type(() => Number)
  idContrato!: number;

  @IsNumber()
  @Min(1)
  @Type(() => Number)
  numeroCuota!: number;

  @IsNumber()
  @Min(0.01)
  @Type(() => Number)
  montoEsperado!: number;

  @IsDate()
  @Type(() => Date)
  fechaVencimiento!: Date;
}

export class CreatePagoDto {
  @IsNumber()
  @Type(() => Number)
  idCuota!: number;

  @IsNumber()
  @Type(() => Number)
  idCliente!: number;

  @IsNumber()
  @Type(() => Number)
  idUsuarioReceptor!: number;

  @IsNumber()
  @Min(0.01)
  @Type(() => Number)
  montoPagado!: number;

  @IsEnum(MetodoPago)
  metodo!: MetodoPago;

  @IsOptional()
  @IsString()
  @Length(1, 500)
  comprobanteUrl?: string;
}

export class UpdateCuotaEstadoDto {
  @IsEnum(EstadoGeneral)
  estado!: EstadoGeneral;
}

export class ReservaResponseDto {
  idReserva!: number;
  idPropiedad!: number;
  idCliente!: number;
  montoReserva?: number;
  estado!: EstadoGeneral;
  fechaReserva!: Date;
}
