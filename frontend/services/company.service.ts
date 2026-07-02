import { api } from "./api";

export interface Company {
  id: string;

  razonSocial: string;
  nombreFantasia?: string;

  rut: string;

  giro?: string;
  direccion?: string;
  comuna?: string;
  region?: string;

  telefono?: string;
  email?: string;
  sitioWeb?: string;

  tipo: string;

  observaciones?: string;

  activo: boolean;
}

export interface CreateCompanyDto {
  razonSocial: string;
  nombreFantasia?: string;

  rut: string;

  giro?: string;
  direccion?: string;
  comuna?: string;
  region?: string;

  telefono?: string;
  email?: string;
  sitioWeb?: string;

  tipo?: string;

  observaciones?: string;
}

export const companyService = {
  async getCompanies(): Promise<Company[]> {
    const { data } = await api.get("/companies");
    return data;
  },

  async getCompany(
    id: string,
  ): Promise<Company> {
    const { data } = await api.get(
      `/companies/${id}`,
    );

    return data;
  },

  async createCompany(dto: CreateCompanyDto) {
    const { data } = await api.post(
      "/companies",
      dto,
    );

    return data;
  },

  async updateCompany(
    id: string,
    dto: Partial<CreateCompanyDto>,
  ) {
    const { data } = await api.patch(
      `/companies/${id}`,
      dto,
    );

    return data;
  },

  async deleteCompany(id: string) {
    const { data } = await api.delete(
      `/companies/${id}`,
    );

    return data;
  },
};