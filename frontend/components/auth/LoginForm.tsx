"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { login } from "@/lib/api";
import { useAuth } from "@/lib/auth/useAuth";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function LoginForm() {
  const router = useRouter();

  const { login: signIn } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(
    e: React.FormEvent<HTMLFormElement>,
  ) {
    e.preventDefault();

    console.log("==================================");
    console.log("LOGIN PRESIONADO");
    console.log("EMAIL:", email);
    console.log("PASSWORD:", password);
    console.log("==================================");

    setLoading(true);
    setError("");

    try {
      console.log("Llamando API LOGIN...");

      const data = await login({
        email,
        password,
      });

      console.log("RESPUESTA LOGIN:");
      console.log(data);

      await signIn(
        data.access_token,
        data.user,
      );

      console.log("TOKEN GUARDADO");
      console.log("REDIRIGIENDO...");

      router.push("/dashboard");

    } catch (err) {

      console.error("ERROR LOGIN:");
      console.error(err);

      setError("Correo o contraseña incorrectos.");

    } finally {

      setLoading(false);

    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-5"
    >
      <Input
        placeholder="Correo electrónico"
        type="email"
        value={email}
        onChange={(e) =>
          setEmail(e.target.value)
        }
      />

      <Input
        placeholder="Contraseña"
        type="password"
        value={password}
        onChange={(e) =>
          setPassword(e.target.value)
        }
      />

      {error && (
        <p className="text-sm text-red-500">
          {error}
        </p>
      )}

      <button
  type="submit"
  className="w-full rounded-lg bg-black py-3 text-white"
  onClick={() => console.log("CLICK HTML")}
>
  Iniciar sesión
</button>
    </form>
  );
}