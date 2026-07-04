import { api } from "./api";

export interface Activity {
  id: string;

  titulo: string;
  descripcion?: string;

  tipo:
    | "LLAMADA"
    | "EMAIL"
    | "WHATSAPP"
    | "REUNION"
    | "VISITA"
    | "TAREA"
    | "NOTA"
    | "COTIZACION"
    | "OTRO";

  realizada: boolean;

  fecha: string;

  companyId?: string;
  prospectId?: string;

  userId: string;

  createdAt: string;
  updatedAt: string;
}

export interface CreateActivityDto {
  titulo: string;

  descripcion?: string;

  tipo: Activity["tipo"];

  realizada?: boolean;

  fecha?: string;

  companyId?: string;

  prospectId?: string;

  userId: string;
}

export const activityService = {

  async getActivities() {
    const { data } = await api.get("/activities");
    return data;
  },

  async getCompanyActivities(
    companyId: string,
  ) {
    const { data } = await api.get(
      `/activities/company/${companyId}`,
    );

    return data;
  },

  async createActivity(
    dto: CreateActivityDto,
  ) {
    const { data } = await api.post(
      "/activities",
      dto,
    );

    return data;
  },

  async updateActivity(
    id: string,
    dto: Partial<CreateActivityDto>,
  ) {
    const { data } = await api.patch(
      `/activities/${id}`,
      dto,
    );

    return data;
  },

  async deleteActivity(
    id: string,
  ) {
    const { data } = await api.delete(
      `/activities/${id}`,
    );

    return data;
  },

};