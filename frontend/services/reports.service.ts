import api from "@/lib/api/axios";

export interface DashboardReport {

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