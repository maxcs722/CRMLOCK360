import { api } from "./api";

export type ProspectStatus =
  | "NUEVO"
  | "CONTACTADO"
  | "VISITA_AGENDADA"
  | "LEVANTAMIENTO"
  | "COTIZANDO"
  | "NEGOCIACION"
  | "GANADO"
  | "PERDIDO";

export interface Prospect {

  id: string;

  titulo: string;

  descripcion?: string;

  servicio?: string;

  status: ProspectStatus;

  valorEstimado?: number;

  fechaContacto?: string;

  proximaAccion?: string;

  createdAt: string;

  company?: {

    id: string;

    razonSocial: string;

    nombreFantasia?: string;

  };

  ejecutivo?: {

    id: string;

    nombre: string;

    apellido: string;

  };

  activities?: any[];

}

export interface CreateProspectDto {

  titulo: string;

  descripcion?: string;

  servicio?: string;

  status: ProspectStatus;

  valorEstimado?: number;

  fechaContacto?: string;

  proximaAccion?: string;

  companyId?: string;

  ejecutivoId?: string;

}

export interface Pipeline {

  NUEVO: Prospect[];

  CONTACTADO: Prospect[];

  VISITA_AGENDADA: Prospect[];

  LEVANTAMIENTO: Prospect[];

  COTIZANDO: Prospect[];

  NEGOCIACION: Prospect[];

  GANADO: Prospect[];

  PERDIDO: Prospect[];

}

export const prospectService = {

  async getProspects() {

    const { data } = await api.get(
      "/prospects",
    );

    return data;

  },

  async getPipeline(): Promise<Pipeline> {

    const { data } = await api.get(
      "/prospects/pipeline",
    );

    return data;

  },

  async getProspect(id: string) {

    const { data } = await api.get(
      `/prospects/${id}`,
    );

    return data;

  },

  async createProspect(
    dto: CreateProspectDto,
  ) {

    const { data } = await api.post(
      "/prospects",
      dto,
    );

    return data;

  },

  async updateProspect(

    id: string,

    dto: Partial<CreateProspectDto>,

  ) {

    const { data } = await api.patch(

      `/prospects/${id}`,

      dto,

    );

    return data;

  },

  async deleteProspect(
    id: string,
  ) {

    const { data } = await api.delete(
      `/prospects/${id}`,
    );

    return data;

  },

  async updateStatus(
  id: string,
  status: ProspectStatus,
) {

  const { data } = await api.patch(
    `/prospects/${id}/status`,
    {
      status,
    },
  );

  return data;

},

};