import api from "@/lib/api/axios";

export interface DashboardReport {

  kpis: {

    empresas: {
      total: number;
      activas: number;
    };

    prospectos: {
      total: number;
      ganados: number;
      perdidos: number;
    };

    actividades: {
      total: number;
      pendientes: number;
      realizadas: number;
    };

    cotizaciones: {
      total: number;
      aceptadas: number;
      pendientes: number;
      rechazadas: number;
    };

  };

  prospectosPorEstado: {
    status: string;
    _count: {
      status: number;
    };
  }[];

  cotizacionesPorEstado: {
    estado: string;
    _count: {
      estado: number;
    };
  }[];

  actividadesPorEstado: {
    estado: string;
    cantidad: number;
  }[];

  ultimasActividades: {
    id: string;
    titulo: string;
    fecha: string;
    realizada: boolean;
    company?: {
      nombre: string;
    };
    user?: {
      nombre: string;
      apellido: string;
    };
  }[];

  ultimasCotizaciones: {
    id: string;
    numero: number;
    estado: string;
    fecha: string;
    total: number;
    company?: {
      nombre: string;
    };
    user?: {
      nombre: string;
      apellido: string;
    };
  }[];

}

class ReportsService {

  async dashboard() {

    const { data } =
      await api.get<DashboardReport>(
        "/reports/dashboard",
      );

    return data;

  }

}

export const reportsService =
  new ReportsService();