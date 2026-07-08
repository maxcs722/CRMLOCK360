import { api } from "./api";

export interface QuoteItem {
  id?: string;

  descripcion: string;

  cantidad: number;

  precio: number;

  descuento?: number;

  subtotal?: number;
}

export interface Quote {

  id: string;

  numero: number;

  estado:
    | "BORRADOR"
    | "ENVIADA"
    | "ACEPTADA"
    | "RECHAZADA"
    | "ANULADA";

  observaciones?: string;

  subtotal: number;

  descuento: number;

  iva: number;

  total: number;

  fecha: string;

  company: {
    id: string;
    razonSocial: string;
    nombreFantasia?: string;
  };

  user: {
    id: string;
    nombre: string;
    apellido: string;
  };

  items: QuoteItem[];
}

export interface CreateQuoteDto {

  companyId: string;

  userId: string;

  observaciones?: string;

  items: QuoteItem[];

}

export const quoteService = {

  async getQuotes() {

    const { data } =
      await api.get("/quotes");

    return data;

  },

  async getQuote(id: string) {

    const { data } =
      await api.get(`/quotes/${id}`);

    return data;

  },

  async createQuote(dto: CreateQuoteDto) {

    const { data } =
      await api.post(
        "/quotes",
        dto,
      );

    return data;

  },

  async updateQuote(
    id: string,
    dto: CreateQuoteDto,
  ) {

    const { data } =
      await api.patch(
        `/quotes/${id}`,
        dto,
      );

    return data;

  },

  async deleteQuote(id: string) {

    const { data } =
      await api.delete(
        `/quotes/${id}`,
      );

    return data;

  },

  async updateStatus(
  id: string,
  estado: string,
) {

  const res = await api.patch(
    `/quotes/${id}/status`,
    {
      estado,
    },
  );

  return res.data;

  },

  openPdf(id: string) {
  window.open(
    `http://localhost:3001/api/quotes/${id}/pdf`,
    "_blank",
  ); 
  },

};