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

      //-----------------------------------
      // KPIs
      //-----------------------------------

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

      //-----------------------------------
      // Gráficos
      //-----------------------------------

      prospectosPorEstado,
      cotizacionesPorEstado,

      //-----------------------------------
      // Tablas
      //-----------------------------------

      ultimasActividades,
      ultimasCotizaciones,

      //-----------------------------------
      // Ventas
      //-----------------------------------

      ventasMensuales,

    ] = await Promise.all([

      //-----------------------------------
      // EMPRESAS
      //-----------------------------------

      this.prisma.company.count(),

      this.prisma.company.count({

        where: {

          activo: true,

        },

      }),

      //-----------------------------------
      // PROSPECTOS
      //-----------------------------------

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

      //-----------------------------------
      // ACTIVIDADES
      //-----------------------------------

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

      //-----------------------------------
      // COTIZACIONES
      //-----------------------------------

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

      //-----------------------------------
      // PROSPECTOS POR ESTADO
      //-----------------------------------

      this.prisma.prospect.groupBy({

        by: ['status'],

        _count: {

          status: true,

        },

      }),

      //-----------------------------------
      // COTIZACIONES POR ESTADO
      //-----------------------------------

      this.prisma.quote.groupBy({

        by: ['estado'],

        _count: {

          estado: true,

        },

      }),

      //-----------------------------------
      // ÚLTIMAS ACTIVIDADES
      //-----------------------------------

      this.prisma.activity.findMany({

        take: 10,

        orderBy: {

          fecha: 'desc',

        },

        include: {

          company: true,

          user: true,

          prospect: true,

        },

      }),

            //-----------------------------------
      // ÚLTIMAS COTIZACIONES
      //-----------------------------------

      this.prisma.quote.findMany({

        take: 10,

        orderBy: {

          fecha: 'desc',

        },

        include: {

          company: true,

          user: true,

        },

      }),

      //-----------------------------------
      // VENTAS MENSUALES
      //-----------------------------------

      this.prisma.quote.findMany({

        select: {

          fecha: true,

          total: true,

          estado: true,

        },

        where: {

          estado: QuoteStatus.ACEPTADA,

        },

        orderBy: {

          fecha: 'asc',

        },

      }),

    ]);

    //-----------------------------------
    // ACTIVIDADES
    //-----------------------------------

    const actividadesPorEstado = [

      {

        estado: 'Pendiente',

        cantidad: actividadesPendientes,

      },

      {

        estado: 'Realizada',

        cantidad: actividadesRealizadas,

      },

    ];

    //-----------------------------------
    // VENTAS POR MES
    //-----------------------------------

    const meses = [

      'Ene',
      'Feb',
      'Mar',
      'Abr',
      'May',
      'Jun',
      'Jul',
      'Ago',
      'Sep',
      'Oct',
      'Nov',
      'Dic',

    ];

    const ventasPorMes = meses.map((mes, index) => {

      const total = ventasMensuales

        .filter((venta) => {

          const fecha = new Date(venta.fecha);

          return fecha.getMonth() === index;

        })

        .reduce((sum, venta) => {

          return sum + Number(venta.total);

        }, 0);

      return {

        mes,

        total,

      };

    });

        //-----------------------------------
    // RESPUESTA
    //-----------------------------------

    return {

      kpis: {

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

      },

      //-----------------------------------
      // GRÁFICOS
      //-----------------------------------

      prospectosPorEstado,

      cotizacionesPorEstado,

      actividadesPorEstado,

      ventasPorMes,

      //-----------------------------------
      // TABLAS
      //-----------------------------------

      ultimasActividades,

      ultimasCotizaciones,

    };

  }

}