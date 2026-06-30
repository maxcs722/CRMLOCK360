import { Injectable } from '@nestjs/common';
import { ProspectStatus } from '@prisma/client';

import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class DashboardService {
  constructor(
    private readonly prisma: PrismaService,
  ) {}

  async getDashboard() {
    const [
      empresas,
      usuarios,
      actividades,
      prospectos,

      nuevos,
      contactados,
      visitas,
      levantamientos,
      cotizando,
      negociacion,
      ganados,
      perdidos,
    ] = await Promise.all([

      this.prisma.company.count(),

      this.prisma.user.count(),

      this.prisma.activity.count(),

      this.prisma.prospect.count(),

      this.prisma.prospect.count({
        where: { status: ProspectStatus.NUEVO },
      }),

      this.prisma.prospect.count({
        where: { status: ProspectStatus.CONTACTADO },
      }),

      this.prisma.prospect.count({
        where: { status: ProspectStatus.VISITA_AGENDADA },
      }),

      this.prisma.prospect.count({
        where: { status: ProspectStatus.LEVANTAMIENTO },
      }),

      this.prisma.prospect.count({
        where: { status: ProspectStatus.COTIZANDO },
      }),

      this.prisma.prospect.count({
        where: { status: ProspectStatus.NEGOCIACION },
      }),

      this.prisma.prospect.count({
        where: { status: ProspectStatus.GANADO },
      }),

      this.prisma.prospect.count({
        where: { status: ProspectStatus.PERDIDO },
      }),
    ]);

    return {
      empresas,
      usuarios,
      actividades,
      prospectos,

      pipeline: {
        nuevos,
        contactados,
        visitas,
        levantamientos,
        cotizando,
        negociacion,
        ganados,
        perdidos,
      },
    };
  }
}