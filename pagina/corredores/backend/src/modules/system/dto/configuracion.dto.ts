import { IsString, IsOptional, Length, IsNotEmpty } from 'class-validator';

export class CreateConfiguracionDto {
  @IsString()
  @Length(1, 100)
  clave!: string;

  @IsString()
  @Length(1, 5000)
  valor!: string;

  @IsOptional()
  @IsString()
  @Length(0, 500)
  descripcion?: string;
}

export class UpdateConfiguracionDto {
  @IsOptional()
  @IsString()
  @Length(1, 5000)
  valor?: string;

  @IsOptional()
  @IsString()
  @Length(0, 500)
  descripcion?: string;
}

export class ConfiguracionResponseDto {
  idConfig!: number;
  clave!: string;
  valor!: string;
  descripcion?: string;
  createdAt!: Date;
  updatedAt!: Date;
}
