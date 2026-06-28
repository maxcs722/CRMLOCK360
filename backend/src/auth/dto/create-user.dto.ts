import { IsEmail, IsEnum, IsOptional, IsString, MinLength } from 'class-validator';

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
  @IsString()
  telefono?: string;

  @IsOptional()
  @IsString()
  cargo?: string;

  @IsOptional()
  @IsEnum(UserRole)
  role?: UserRole;
}