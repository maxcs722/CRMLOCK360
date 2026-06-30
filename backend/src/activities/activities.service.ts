import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';

import { CreateActivityDto } from './dto/create-activity.dto';
import { UpdateActivityDto } from './dto/update-activity.dto';

@Injectable()
export class ActivitiesService {
  constructor(
    private readonly prisma: PrismaService,
  ) {}

  async create(dto: CreateActivityDto) {
    return this.prisma.activity.create({
      data: {
        titulo: dto.titulo,
        descripcion: dto.descripcion,
        tipo: dto.tipo,
        realizada: dto.realizada ?? false,
        fecha: dto.fecha ? new Date(dto.fecha) : new Date(),

        prospect: {
          connect: {
            id: dto.prospectId,
          },
        },

        user: {
          connect: {
            id: dto.userId,
          },
        },

        ...(dto.companyId && {
          company: {
            connect: {
              id: dto.companyId,
            },
          },
        }),
      },

      include: {
        prospect: true,
        user: true,
        company: true,
      },
    });
  }

  async findAll() {
    return this.prisma.activity.findMany({
      include: {
        prospect: true,
        user: true,
        company: true,
      },
      orderBy: {
        fecha: 'desc',
      },
    });
  }

  async findOne(id: string) {
    const activity = await this.prisma.activity.findUnique({
      where: { id },
      include: {
        prospect: true,
        user: true,
        company: true,
      },
    });

    if (!activity) {
      throw new NotFoundException(
        'Actividad no encontrada.',
      );
    }

    return activity;
  }

  async update(id: string, dto: UpdateActivityDto) {
    await this.findOne(id);

    return this.prisma.activity.update({
      where: { id },
      data: {
        titulo: dto.titulo,
        descripcion: dto.descripcion,
        tipo: dto.tipo,
        realizada: dto.realizada,
        fecha: dto.fecha
          ? new Date(dto.fecha)
          : undefined,
      },
      include: {
        prospect: true,
        user: true,
        company: true,
      },
    });
  }

  async remove(id: string) {
    await this.findOne(id);

    return this.prisma.activity.delete({
      where: { id },
    });
  }
}