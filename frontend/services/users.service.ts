import { api } from "./api";

export interface User {
  id: string;
  nombre: string;
  apellido: string;
  email: string;
  telefono?: string;
  cargo?: string;
  color?: string;
  role: string;
  activo: boolean;
}

export const usersService = {
  async getUsers(): Promise<User[]> {
    const { data } = await api.get("/users");
    return data;
  },
};