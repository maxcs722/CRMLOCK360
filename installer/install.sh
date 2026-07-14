#!/bin/bash

echo "========================================"
echo "        LOCK360 CRM Installer"
echo "========================================"

echo ""

echo "Verificando NodeJS..."

if ! command -v node &> /dev/null
then
    echo "NodeJS no está instalado."
    exit 1
fi

echo "OK"

echo ""

echo "Verificando npm..."

if ! command -v npm &> /dev/null
then
    echo "npm no está instalado."
    exit 1
fi

echo "OK"

echo ""

echo "Instalando Backend..."

cd backend || exit

npm install

echo ""

echo "Generando Prisma..."

npx prisma generate

echo ""

echo "Aplicando Migraciones..."

npx prisma migrate deploy

cd ..

echo ""

echo "Instalando Frontend..."

cd frontend || exit

npm install

cd ..

echo ""

echo "========================================"
echo "Instalación Finalizada"
echo ""
echo "Backend:"
echo "http://localhost:3001"
echo ""
echo "Frontend:"
echo "http://localhost:3000"
echo ""
echo "Swagger:"
echo "http://localhost:3001/docs"
echo "========================================"
