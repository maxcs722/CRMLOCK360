# LOCK360 CRM

<p align="center">

<img src="docs/logo.png" width="150">

</p>

<p align="center">

CRM Empresarial desarrollado con Next.js + NestJS + Prisma + PostgreSQL.

Sistema orientado a empresas de Seguridad Electrónica, Servicios TI, Control de Acceso, CCTV, Networking y Servicios Profesionales.

</p>

---

# Características

Actualmente el sistema incluye:

- Dashboard Ejecutivo
- Gestión de Empresas
- Gestión de Prospectos
- Pipeline Comercial
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

- Next.js 15
- React
- TypeScript
- TailwindCSS
- Axios
- Lucide Icons

## Backend

- NestJS
- Prisma ORM
- PostgreSQL
- JWT
- bcrypt

---

# Arquitectura

```
               Frontend
              (Next.js)

                   │

               Axios REST

                   │

              Backend API
                (NestJS)

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

# Clonar el proyecto

```bash
git clone https://github.com/maxcs722/CRMLOCK360.git
```

Entrar al proyecto

```bash
cd CRMLOCK360
```

---

# Instalación Backend

Entrar al backend

```bash
cd backend
```

Instalar dependencias

```bash
npm install
```

---

## Variables de entorno

Crear

```
backend/.env
```

Ejemplo

```env
DATABASE_URL="postgresql://postgres:password@localhost:5432/lock360"

JWT_SECRET="cambiar_por_un_token_seguro"

PORT=3001
```

---

## Prisma

Generar cliente

```bash
npx prisma generate
```

Crear Base de Datos

```bash
npx prisma migrate dev
```

Si ya existen migraciones

```bash
npx prisma migrate deploy
```

Ver datos

```bash
npx prisma studio
```

---

## Ejecutar Backend

```bash
npm run start:dev
```

El backend quedará disponible en

```
http://localhost:3001
```

---

# Instalación Frontend

Abrir otra terminal

```bash
cd CRMLOCK360/frontend
```

Instalar dependencias

```bash
npm install
```

---

## Variables de entorno

Crear

```
frontend/.env.local
```

Contenido

```env
NEXT_PUBLIC_API_URL=http://localhost:3001
```

---

## Ejecutar Frontend

```bash
npm run dev
```

Abrir

```
http://localhost:3000
```

---

# Inicio de Sesión

Usuario administrador

```
admin@lock360.cl
```

Contraseña

```
********
```

> Cambiar la contraseña después del primer inicio de sesión.

---

# Estructura del Proyecto

```
CRMLOCK360/

backend/

    prisma/

    src/

        auth/

        users/

        companies/

        prospects/

        activities/

        quotes/

        dashboard/

        reports/

frontend/

    app/

    components/

    services/

    hooks/

    lib/

docs/

README.md
```

---

# Scripts

## Backend

```bash
npm run start
```

```bash
npm run start:dev
```

```bash
npm run build
```

```bash
npm run lint
```

---

## Frontend

```bash
npm run dev
```

```bash
npm run build
```

```bash
npm run lint
```

---

# Solución de Problemas

## Error

```
npm ERR! Missing script: start:dev
```

### Causa

Se está ejecutando el comando desde la carpeta raíz.

### Incorrecto

```bash
CRMLOCK360/

npm run start:dev
```

### Correcto

```bash
cd backend

npm run start:dev
```

---

## Error

```
Prisma Client is not generated
```

Solución

```bash
npx prisma generate
```

---

## Error

```
P1001
```

Significa que PostgreSQL no está iniciado.

Verificar

```bash
sudo systemctl status postgresql
```

---

## Error

```
relation does not exist
```

Ejecutar

```bash
npx prisma migrate dev
```

---

# Roadmap

- Dashboard Ejecutivo
- Empresas
- Prospectos
- Pipeline Comercial
- Actividades
- Cotizaciones
- Usuarios
- Reportes
- Exportación PDF
- Exportación Excel
- Agenda Comercial
- Calendario
- Envío de Correos
- Firma Digital
- Multiempresa
- API Pública
- Aplicación Móvil

---

# Contribuir

1. Crear un Fork

2. Crear una rama

```bash
git checkout -b feature/nueva-funcionalidad
```

3. Commit

```bash
git commit -m "feat: nueva funcionalidad"
```

4. Push

```bash
git push origin feature/nueva-funcionalidad
```

5. Crear Pull Request

---

# Licencia

MIT License

---

# Autor

**Víctor Figueroa**

LOCK360 CRM

Chile

```
