import { Injectable } from '@nestjs/common';
import { QuoteStatus } from '@prisma/client';

import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ReportsService {
  constructor(
    private readonly prisma: PrismaService,
  ) {}

  async dashboard() {
    const [
      totalEmpresas,
      empresasActivas,

      totalProspectos,
      prospectosGanados,
      prospectosPerdidos,

      totalActividades,
      actividadesPendientes,
      actividadesRealizadas,

      totalCotizaciones,
      cotizacionesAceptadas,
      cotizacionesPendientes,
      cotizacionesRechazadas,
    ] = await Promise.all([
      this.prisma.company.count(),

      this.prisma.company.count({
        where: {
          activo: true,
        },
      }),

      this.prisma.prospect.count(),

      this.prisma.prospect.count({
        where: {
          status: 'GANADO',
        },
      }),

      this.prisma.prospect.count({
        where: {
          status: 'PERDIDO',
        },
      }),

      this.prisma.activity.count(),

      this.prisma.activity.count({
        where: {
          realizada: false,
        },
      }),

      this.prisma.activity.count({
        where: {
          realizada: true,
        },
      }),

      this.prisma.quote.count(),

      this.prisma.quote.count({
        where: {
          estado: QuoteStatus.ACEPTADA,
        },
      }),

      this.prisma.quote.count({
        where: {
          estado: QuoteStatus.ENVIADA,
        },
      }),

      this.prisma.quote.count({
        where: {
          estado: QuoteStatus.RECHAZADA,
        },
      }),
    ]);

    return {
      empresas: {
        total: totalEmpresas,
        activas: empresasActivas,
      },

      prospectos: {
        total: totalProspectos,
        ganados: prospectosGanados,
        perdidos: prospectosPerdidos,
      },

      actividades: {
        total: totalActividades,
        pendientes: actividadesPendientes,
        realizadas: actividadesRealizadas,
      },

      cotizaciones: {
        total: totalCotizaciones,
        aceptadas: cotizacionesAceptadas,
        pendientes: cotizacionesPendientes,
        rechazadas: cotizacionesRechazadas,
      },
    };
  }
}