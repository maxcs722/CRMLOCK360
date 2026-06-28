import {
  IsEmail,
  IsEnum,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';

export enum UserRole {
  ADMIN = 'ADMIN',
  GERENTE = 'GERENTE',
  EJECUTIVO = 'EJECUTIVO',
  TECNICO = 'TECNICO',
}

export class CreateUserDto {
  @IsString()
  nombre: string;

  @IsString()
  apellido: string;

  @IsEmail()
  email: string;

  @MinLength(6)
  password: string;

  @IsOptional()
  telefono?: string;

  @IsOptional()
  cargo?: string;

  @IsOptional()
  color?: string;

  @IsEnum(UserRole)
  role: UserRole;
}