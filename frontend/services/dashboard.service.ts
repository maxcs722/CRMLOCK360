import { api } from "./api";

export interface DashboardStats {
  empresas: number;
  usuarios: number;
  prospectos: number;
  actividades: number;
  actividadesPendientes: number;
}

export interface DashboardPipeline {
  nuevos: number;
  contactados: number;
  visitas: number;
  levantamientos: number;
  cotizando: number;
  negociacion: number;
  ganados: number;
  perdidos: number;
}

export interface RecentCompany {
  id: string;
  razonSocial: string;
  nombreFantasia?: string;
  tipo: string;
  createdAt: string;
}

export interface UpcomingActivity {
  id: string;
  titulo: string;
  fecha: string;
  tipo: string;
  realizada: boolean;

  company?: {
    razonSocial: string;
    nombreFantasia?: string;
  };
}

export interface DashboardResponse {

  stats: DashboardStats;

  pipeline: DashboardPipeline;

  ultimasEmpresas: RecentCompany[];

  proximasActividades: UpcomingActivity[];

}

export const dashboardService = {

  async getDashboard() {

    const { data } = await api.get("/dashboard");

    return data as DashboardResponse;

  },

};