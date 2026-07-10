import { IsEnum } from "class-validator";

import { ProspectStatus } from "@prisma/client";

export class UpdateProspectStatusDto {

  @IsEnum(ProspectStatus)

  status: ProspectStatus;

}