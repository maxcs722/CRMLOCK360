import { api } from "./api";

export interface Company {
  id: string;

  razonSocial: string;
  nombreFantasia: string;

  rut: string;

  giro?: string;

  direccion?: string;
  comuna?: string;
  region?: string;

  telefono?: string;
  email?: string;
  sitioWeb?: string;

  tipo: string;

  activo: boolean;
}

export const companyService = {
  async getCompanies(): Promise<Company[]> {
    const { data } = await api.get("/companies");
    return data;
  },
};