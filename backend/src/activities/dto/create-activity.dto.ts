import {
  IsBoolean,
  IsDateString,
  IsEnum,
  IsOptional,
  IsString,
} from 'class-validator';

import { ActivityType } from '@prisma/client';

export class CreateActivityDto {
  @IsString()
  titulo!: string;

  @IsOptional()
  @IsString()
  descripcion?: string;

  @IsEnum(ActivityType)
  tipo!: ActivityType;

  @IsOptional()
  @IsBoolean()
  realizada?: boolean;

  @IsOptional()
  @IsDateString()
  fecha?: string;

  @IsString()
  prospectId!: string;

  @IsString()
  userId!: string;

  @IsOptional()
  @IsString()
  companyId?: string;
}