import { api } from "./api";

export interface Contact {
  id: string;

  nombre: string;
  apellido: string;

  cargo?: string;

  telefono?: string;
  whatsapp?: string;

  email?: string;

  observaciones?: string;

  companyId: string;
}

export interface CreateContactDto {
  nombre: string;
  apellido: string;

  cargo?: string;

  telefono?: string;
  whatsapp?: string;

  email?: string;

  observaciones?: string;

  companyId: string;
}

export const contactService = {
  async getContacts(): Promise<Contact[]> {
    const { data } = await api.get("/contacts");
    return data;
  },

  async getCompanyContacts(
    companyId: string,
  ): Promise<Contact[]> {
    const { data } = await api.get(
      `/contacts/company/${companyId}`,
    );

    return data;
  },

  async createContact(
    dto: CreateContactDto,
  ): Promise<Contact> {
    try {
      const { data } = await api.post(
        "/contacts",
        dto,
      );

      return data;

    } catch (error: any) {
      console.log("========== CREATE CONTACT ==========");
      console.log("STATUS:", error.response?.status);
      console.log("DATA:", error.response?.data);
      console.log("====================================");
      throw error;
    }
  },

  async updateContact(
    id: string,
    dto: Partial<CreateContactDto>,
  ): Promise<Contact> {
    try {
      const { data } = await api.patch(
        `/contacts/${id}`,
        dto,
      );

      return data;

    } catch (error: any) {
      console.log("========== UPDATE CONTACT ==========");
      console.log("STATUS:", error.response?.status);
      console.log("DATA:", error.response?.data);
      console.log("====================================");
      throw error;
    }
  },

  async deleteContact(
    id: string,
  ) {
    const { data } = await api.delete(
      `/contacts/${id}`,
    );

    return data;
  },
};