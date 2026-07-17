# LOCK360 CRM

<p align="center">
<img src="docs/logo.png" width="180">
</p>

<p align="center">

CRM Empresarial desarrollado con **Next.js**, **NestJS**, **Prisma ORM** y **PostgreSQL**.

Orientado a empresas de Seguridad Electrónica, CCTV, Control de Acceso, Networking, Servicios TI y Mantenimiento.

</p>

---

# Características

Actualmente el sistema incorpora:

- Dashboard Ejecutivo
- Gestión de Empresas
- Gestión de Prospectos
- Gestión de Actividades
- Gestión de Cotizaciones
- Gestión de Usuarios
- Reportes
- Autenticación JWT
- Roles de Usuario
- PostgreSQL
- Prisma ORM

---

# Tecnologías

## Frontend

- Next.js
- React
- TypeScript
- TailwindCSS
- Axios

## Backend

- NestJS
- Prisma ORM
- PostgreSQL
- JWT
- bcrypt

---

# Arquitectura

```
Frontend (Next.js)

        │

 REST API (Axios)

        │

Backend (NestJS)

        │

   Prisma ORM

        │

 PostgreSQL
```

---

# Requisitos

Antes de comenzar instalar:

- NodeJS 22+
- PostgreSQL 16+
- npm
- Git

Verificar:

```bash
node -v
npm -v
psql --version
```

---

# Clonar el Proyecto

```bash
git clone https://github.com/maxcs722/CRMLOCK360.git

cd CRMLOCK360
```

---

# Instalación Automática (Recomendada)

Dar permisos al instalador:

```bash
chmod +x installer/install.sh
```

Ejecutar:

```bash
./installer/install.sh
```

El instalador:

- Instala dependencias
- Genera Prisma Client
- Ejecuta migraciones
- Prepara Frontend
- Prepara Backend

---

# Instalación Manual

## Backend

```bash
cd backend

npm install
```

Crear:

```
backend/.env
```

```env
DATABASE_URL="postgresql://postgres:password@localhost:5432/lock360"

JWT_SECRET="CambiarPorUnaClaveSegura"

PORT=3001
```

Generar Prisma:

```bash
npx prisma generate
```

Ejecutar migraciones:

```bash
npx prisma migrate dev
```

---

## Frontend

Abrir otra terminal.

```bash
cd frontend

npm install
```

Crear:

```
frontend/.env.local
```

```env
NEXT_PUBLIC_API_URL=http://localhost:3001/api
```

---

# Primer Inicio

## Terminal 1

```bash
cd backend

npm run start:dev
```

Backend:

```
http://localhost:3001
```

Swagger:

```
http://localhost:3001/docs
```

---

## Terminal 2

```bash
cd frontend

npm run dev
```

Frontend:

```
http://localhost:3000
```

---

# Acceso al CRM

Abrir el navegador:

```
http://localhost:3000
```

Usuario:

```
lock360@lock360.cl
```

Contraseña:

```
Lock2026
```

> Se recomienda cambiar la contraseña después del primer inicio de sesión.

---

# Uso del CRM

## Dashboard

Muestra un resumen de:

- Empresas
- Prospectos
- Actividades
- Cotizaciones
- Usuarios
- Reportes

---

## Empresas

Permite:

- Crear empresas
- Editarlas
- Buscar empresas
- Desactivarlas

---

## Prospectos

Permite administrar clientes potenciales.

Cada prospecto puede tener:

- Empresa
- Contacto
- Estado
- Ejecutivo
- Observaciones

---

## Actividades

Permite registrar:

- Llamadas
- Visitas
- Reuniones
- Correos
- Seguimientos

---

## Cotizaciones

Permite:

- Crear cotizaciones
- Editarlas
- Cambiar estado

---

## Usuarios

Solo Administradores.

Permite:

- Crear usuarios
- Editarlos
- Desactivarlos
- Asignar roles

---

# Acceso desde otros equipos

Si el servidor posee la IP:

```
192.168.1.201
```

Los demás equipos podrán ingresar mediante:

```
http://192.168.1.201:3000
```

En el Backend:

```ts
await app.listen(3001, "0.0.0.0");
```

En el Frontend:

```
frontend/.env.local
```

```env
NEXT_PUBLIC_API_URL=http://192.168.1.201:3001/api
```

En Next.js agregar:

```ts
allowedDevOrigins: [
  "192.168.1.201",
]
```

Reiniciar el Frontend:

```bash
npm run dev
```

---

# Scripts

## Backend

```bash
npm run start

npm run start:dev

npm run build

npm run start:prod
```

## Frontend

```bash
npm run dev

npm run build

npm run start
```

---

# Solución de Problemas

## Missing script start:dev

Ejecute el comando desde la carpeta correcta.

```bash
cd backend

npm run start:dev
```

---

## Prisma Client no generado

```bash
npx prisma generate
```

---

## PostgreSQL no responde

Verificar:

```bash
sudo systemctl status postgresql
```

---

## Error de migraciones

```bash
npx prisma migrate dev
```

---

## Error Next.js

Si aparece:

```
Blocked cross-origin request to Next.js dev resource
```

Agregar la IP del servidor en:

```ts
allowedDevOrigins: [
    "192.168.1.201",
]
```

---

# Estructura del Proyecto

```
CRMLOCK360/

backend/
frontend/
docs/
installer/
README.md
```

---

# Roadmap

- Dashboard Ejecutivo
- Agenda Comercial
- Calendario
- Exportación PDF
- Exportación Excel
- Órdenes de Trabajo
- Inventario
- Facturación
- WhatsApp Business
- Aplicación Móvil

---

# Contribuir

```bash
git checkout -b feature/nueva-funcionalidad

git commit -m "feat: nueva funcionalidad"

git push origin feature/nueva-funcionalidad
```

Luego crear un Pull Request.

---

# Licencia

MIT License

---

# Autor

**Víctor Figueroa**

LOCK360 CRM

Chile