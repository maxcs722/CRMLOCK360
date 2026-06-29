import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateUserDto) {
    const exists = await this.prisma.user.findUnique({
      where: {
        email: dto.email,
      },
    });

    if (exists) {
      throw new BadRequestException('El correo ya existe.');
    }

    const password = await bcrypt.hash(dto.password, 10);

    return this.prisma.user.create({
      data: {
        nombre: dto.nombre,
        apellido: dto.apellido,
        email: dto.email,
        password,
        telefono: dto.telefono,
        cargo: dto.cargo,
        color: dto.color ?? '#2563EB',
        role: dto.role ?? 'EJECUTIVO',
      },
      select: {
        id: true,
        nombre: true,
        apellido: true,
        email: true,
        telefono: true,
        cargo: true,
        color: true,
        role: true,
        activo: true,
        createdAt: true,
      },
    });
  }

  async findAll() {
    return this.prisma.user.findMany({
      orderBy: {
        nombre: 'asc',
      },
      select: {
        id: true,
        nombre: true,
        apellido: true,
        email: true,
        telefono: true,
        cargo: true,
        color: true,
        role: true,
        activo: true,
        createdAt: true,
      },
    });
  }

  async findOne(id: string) {
    const user = await this.prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        nombre: true,
        apellido: true,
        email: true,
        telefono: true,
        cargo: true,
        color: true,
        role: true,
        activo: true,
        createdAt: true,
      },
    });

    if (!user) {
      throw new NotFoundException('Usuario no encontrado.');
    }

    return user;
  }

  async remove(id: string) {
    return this.prisma.user.update({
      where: { id },
      data: {
        activo: false,
      },
    });
  }
}