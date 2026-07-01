import api from './axios';

export interface LoginDto {
  email: string;
  password: string;
}

export interface LoginResponse {
  access_token: string;
  user: {
    id: string;
    nombre: string;
    apellido: string;
    email: string;
    role: string;
  };
}

export async function login(dto: LoginDto) {
  const { data } = await api.post<LoginResponse>(
    '/auth/login',
    dto,
  );

  return data;
}

export async function getProfile() {
  const { data } = await api.get('/auth/profile');

  return data;
}