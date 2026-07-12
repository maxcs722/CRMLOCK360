"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";

import { getProfile } from "@/lib/api";

import {
  getToken,
  removeToken,
  saveToken,
} from "./auth-storage";

interface User {
  id: string;
  nombre: string;
  apellido: string;
  email: string;
  role: string;
}

interface AuthContextData {
  user: User | null;
  loading: boolean;

  login: (
    token: string,
    user: User,
  ) => Promise<void>;

  logout: () => void;
}

const AuthContext =
  createContext<AuthContextData | null>(
    null,
  );

export function AuthProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [user, setUser] =
    useState<User | null>(null);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    async function loadUser() {
      try {
        const token = getToken();

        console.log(
          "========== AUTH ==========",
        );
        console.log("TOKEN:", token);

        if (!token) {
          console.warn(
            "No existe access_token.",
          );

          setLoading(false);
          return;
        }

        console.log(
          "Consultando perfil...",
        );

        const profile =
          await getProfile();

        console.log(
          "PROFILE:",
          profile,
        );

        setUser(profile);

        console.log(
          "Usuario autenticado:",
          profile.id,
        );
      } catch (error) {
        console.error(
          "Error obteniendo perfil:",
          error,
        );

        removeToken();
      } finally {
        setLoading(false);
      }
    }

    loadUser();
  }, []);

  async function login(
    token: string,
    user: User,
  ) {
    console.log(
      "LOGIN OK",
      user,
    );

    saveToken(token);

    setUser(user);
  }

  function logout() {
    console.log("LOGOUT");

    removeToken();

    setUser(null);
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuthContext() {
  const context =
    useContext(AuthContext);

  if (!context) {
    throw new Error(
      "useAuth debe usarse dentro de AuthProvider",
    );
  }

  return context;
}