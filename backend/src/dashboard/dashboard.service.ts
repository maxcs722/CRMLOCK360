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
      actividadesPendientes,
      prospectos,

      nuevos,
      contactados,
      visitas,
      levantamientos,
      cotizando,
      negociacion,
      ganados,
      perdidos,

      ultimasEmpresas,
      proximasActividades,

    ] = await Promise.all([

      this.prisma.company.count({
        where: {
          activo: true,
        },
      }),

      this.prisma.user.count(),

      this.prisma.activity.count(),

      this.prisma.activity.count({
        where: {
          realizada: false,
        },
      }),

      this.prisma.prospect.count(),

      this.prisma.prospect.count({
        where: {
          status: ProspectStatus.NUEVO,
        },
      }),

      this.prisma.prospect.count({
        where: {
          status: ProspectStatus.CONTACTADO,
        },
      }),

      this.prisma.prospect.count({
        where: {
          status: ProspectStatus.VISITA_AGENDADA,
        },
      }),

      this.prisma.prospect.count({
        where: {
          status: ProspectStatus.LEVANTAMIENTO,
        },
      }),

      this.prisma.prospect.count({
        where: {
          status: ProspectStatus.COTIZANDO,
        },
      }),

      this.prisma.prospect.count({
        where: {
          status: ProspectStatus.NEGOCIACION,
        },
      }),

      this.prisma.prospect.count({
        where: {
          status: ProspectStatus.GANADO,
        },
      }),

      this.prisma.prospect.count({
        where: {
          status: ProspectStatus.PERDIDO,
        },
      }),

      this.prisma.company.findMany({

        where: {
          activo: true,
        },

        take: 5,

        orderBy: {
          createdAt: 'desc',
        },

        select: {
          id: true,
          razonSocial: true,
          nombreFantasia: true,
          tipo: true,
          createdAt: true,
        },

      }),

      this.prisma.activity.findMany({

        where: {
          realizada: false,
        },

        take: 5,

        orderBy: {
          fecha: 'asc',
        },

        include: {
          company: {
            select: {
              razonSocial: true,
              nombreFantasia: true,
            },
          },
        },

      }),

    ]);

    return {

      stats: {

        empresas,

        usuarios,

        prospectos,

        actividades,

        actividadesPendientes,

      },

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

      ultimasEmpresas,

      proximasActividades,

    };

  }

}