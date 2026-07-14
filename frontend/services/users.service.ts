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

export interface CreateUserDto {

  nombre: string;

  apellido: string;

  email: string;

  password: string;

  cargo?: string;

  role: string;

}

export const usersService = {

  async getUsers(): Promise<User[]> {

    const { data } = await api.get("/users");

    return data;

  },

  async createUser(dto: CreateUserDto) {

    const { data } = await api.post(
      "/users",
      dto,
    );

    return data;

  },

};