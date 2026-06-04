import { IsString, IsNumber, IsEnum, IsOptional, Length, Min, IsNotEmpty } from 'class-validator';
import { TipoOperacion, EstadoPropiedad } from '../../../common/enums/estado.enum';
import { Type } from 'class-transformer';

export class CreatePropiedadDto {
  @IsNumber()
  @Type(() => Number)
  idCorredor!: number;

  @IsString()
  @Length(1, 200)
  titulo!: string;

  @IsOptional()
  @IsString()
  descripcion?: string;

  @IsString()
  @Length(5, 255)
  direccion!: string;

  @IsNumber()
  @Min(0.01)
  @Type(() => Number)
  precio!: number;

  @IsOptional()
  @IsString()
  @Length(1, 50)
  tipoPropiedad?: string;

  @IsEnum(TipoOperacion)
  operacion!: TipoOperacion;
}

export class UpdatePropiedadDto {
  @IsOptional()
  @IsString()
  @Length(1, 200)
  titulo?: string;

  @IsOptional()
  @IsString()
  descripcion?: string;

  @IsOptional()
  @IsString()
  @Length(5, 255)
  direccion?: string;

  @IsOptional()
  @IsNumber()
  @Min(0.01)
  precio?: number;

  @IsOptional()
  @IsEnum(EstadoPropiedad)
  estado?: EstadoPropiedad;
}

export class BuscarPropiedadesDto {
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  precioMin?: number;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  precioMax?: number;

  @IsOptional()
  @IsString()
  tipo?: string;

  @IsOptional()
  @IsEnum(EstadoPropiedad)
  estado?: EstadoPropiedad;

  @IsOptional()
  @IsEnum(TipoOperacion)
  operacion?: TipoOperacion;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  pagina?: number = 1;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  limite?: number = 10;
}

export class PropiedadResponseDto {
  idPropiedad!: number;
  titulo!: string;
  descripcion?: string;
  direccion!: string;
  precio!: number;
  tipoPropiedad?: string;
  operacion!: TipoOperacion;
  estado!: EstadoPropiedad;
  createdAt!: Date;
  updatedAt!: Date;
}
