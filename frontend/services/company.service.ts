import { api } from "./api";

export interface Company {
  id: string;
  nombre: string;
  rut: string;
  giro?: string;
  telefono?: string;
  email?: string;
  ciudad?: string;
  activo: boolean;
}

export const companyService = {
  async getCompanies(): Promise<Company[]> {
    const { data } = await api.get("/companies");
    return data;
  },
};