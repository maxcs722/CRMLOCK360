'use client';

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from 'react';

import {
  getProfile,
} from '@/lib/api';

import {
  getToken,
  removeToken,
  saveToken,
} from './auth-storage';

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

  login: (token: string, user: User) => Promise<void>;

  logout: () => void;
}

const AuthContext =
  createContext<AuthContextData | null>(null);

export function AuthProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [user, setUser] = useState<User | null>(null);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    async function loadUser() {
      try {
        const token = getToken();

        if (!token) {
          setLoading(false);
          return;
        }

        const profile = await getProfile();

        setUser(profile);
      } catch {
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
    saveToken(token);

    setUser(user);
  }

  function logout() {
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
      'useAuth debe usarse dentro de AuthProvider',
    );
  }

  return context;
}