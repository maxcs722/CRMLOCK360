import {
  IsDateString,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

import { ProspectStatus } from '@prisma/client';

export class CreateProspectDto {
  @IsString()
  titulo!: string;

  @IsOptional()
  @IsString()
  descripcion?: string;

  @IsString()
  servicio!: string;

  @IsOptional()
  @IsEnum(ProspectStatus)
  status?: ProspectStatus;

  @IsOptional()
  @IsNumber()
  valorEstimado?: number;

  @IsOptional()
  @IsDateString()
  fechaContacto?: string;

  @IsOptional()
  @IsDateString()
  proximaAccion?: string;

  @IsOptional()
  @IsString()
  companyId?: string;

  @IsOptional()
  @IsString()
  ejecutivoId?: string;
}