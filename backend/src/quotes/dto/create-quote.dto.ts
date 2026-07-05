import {
  IsArray,
  IsNumber,
  IsOptional,
  IsString,
} from "class-validator";

export class CreateQuoteItemDto {
  @IsString()
  descripcion: string;

  @IsNumber()
  cantidad: number;

  @IsNumber()
  precio: number;

  @IsOptional()
  @IsNumber()
  descuento?: number;
}

export class CreateQuoteDto {
  @IsString()
  companyId: string;

  @IsString()
  userId: string;

  @IsOptional()
  @IsString()
  observaciones?: string;

  @IsArray()
  items: CreateQuoteItemDto[];
}