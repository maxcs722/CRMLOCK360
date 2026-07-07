import { IsEnum } from "class-validator";
import { QuoteStatus } from "@prisma/client";

export class UpdateStatusDto {

  @IsEnum(QuoteStatus)
  estado: QuoteStatus;

}