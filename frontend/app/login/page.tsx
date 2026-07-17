import LoginForm from "@/components/auth/LoginForm";

export default function LoginPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-100">
      <div className="w-full max-w-md rounded-xl bg-white p-8 shadow-xl">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold">
            LOCK360 CRM
          </h1>

          <p className="mt-2 text-gray-500">
            Seguridad Electrónica y Servicios Integrales
          </p>
        </div>

        <LoginForm />
      </div>
    </main>
  );
}