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

    console.log("==================================");
    console.log("PATCH ID:", id);
    console.log("PATCH DTO:", dto);
    console.log("==================================");

    try {

      const { data } = await api.patch(
        `/activities/${id}`,
        dto,
      );

      console.log("PATCH OK");
      console.log(data);

      return data;

    } catch (error: any) {

      console.log("==================================");
      console.log("PATCH ERROR");
      console.log("STATUS:", error.response?.status);

      console.log("OBJETO:");
      console.dir(error.response?.data);

      alert(
        JSON.stringify(
          error.response?.data,
          null,
          2,
        )
      );

      throw error;
    }
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