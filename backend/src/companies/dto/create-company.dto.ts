import {
  IsEmail,
  IsEnum,
  IsOptional,
  IsString,
} from 'class-validator';

import {
  CompanyType,
  LeadSource,
} from '@prisma/client';

export class CreateCompanyDto {
  @IsString()
  razonSocial!: string;

  @IsOptional()
  @IsString()
  nombreFantasia?: string;

  // Ahora el RUT es opcional
  @IsOptional()
  @IsString()
  rut!: string;

  @IsOptional()
  @IsString()
  giro?: string;

  @IsOptional()
  @IsString()
  direccion?: string;

  @IsOptional()
  @IsString()
  comuna?: string;

  @IsOptional()
  @IsString()
  region?: string;

  @IsOptional()
  @IsString()
  telefono?: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsString()
  sitioWeb?: string;

  @IsOptional()
  @IsEnum(CompanyType)
  tipo?: CompanyType;

  @IsOptional()
  @IsEnum(LeadSource)
  origen?: LeadSource;

  @IsOptional()
  @IsString()
  observaciones?: string;

  @IsOptional()
  @IsString()
  ejecutivoId?: string;
}