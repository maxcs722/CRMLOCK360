import { api } from "./api";

export interface DashboardResponse {
  empresas: number;
  usuarios: number;
  actividades: number;
  prospectos: number;
  pipeline: {
    nuevos: number;
    contactados: number;
    visitas: number;
    levantamientos: number;
    cotizando: number;
    negociacion: number;
    ganados: number;
    perdidos: number;
  };
}

export const dashboardService = {
  async getDashboard(): Promise<DashboardResponse> {
    const { data } = await api.get<DashboardResponse>("/dashboard");
    return data;
  },
};