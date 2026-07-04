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
        fecha: dto.fecha
          ? new Date(dto.fecha)
          : new Date(),

        ...(dto.companyId && {
          company: {
            connect: {
              id: dto.companyId,
            },
          },
        }),

        ...(dto.prospectId && {
          prospect: {
            connect: {
              id: dto.prospectId,
            },
          },
        }),

        user: {
          connect: {
            id: dto.userId,
          },
        },
      },

      include: {
        company: true,
        prospect: true,
        user: true,
      },
    });
  }

  async findAll() {
    return this.prisma.activity.findMany({
      include: {
        company: {
          select: {
            id: true,
            razonSocial: true,
            nombreFantasia: true,
          },
        },

        prospect: {
          select: {
            id: true,
            titulo: true,
          },
        },

        user: {
          select: {
            id: true,
            nombre: true,
            apellido: true,
          },
        },
      },

      orderBy: {
        fecha: 'desc',
      },
    });
  }

  async findOne(id: string) {
    const activity =
      await this.prisma.activity.findUnique({
        where: {
          id,
        },

        include: {
          company: {
            select: {
              id: true,
              razonSocial: true,
              nombreFantasia: true,
            },
          },

          prospect: {
            select: {
              id: true,
              titulo: true,
            },
          },

          user: {
            select: {
              id: true,
              nombre: true,
              apellido: true,
            },
          },
        },
      });

    if (!activity) {
      throw new NotFoundException(
        'Actividad no encontrada.',
      );
    }

    return activity;
  }

  async findByCompany(companyId: string) {
    return this.prisma.activity.findMany({
      where: {
        companyId,
      },

      include: {
        company: {
          select: {
            id: true,
            razonSocial: true,
            nombreFantasia: true,
          },
        },

        prospect: {
          select: {
            id: true,
            titulo: true,
          },
        },

        user: {
          select: {
            id: true,
            nombre: true,
            apellido: true,
          },
        },
      },

      orderBy: {
        fecha: 'desc',
      },
    });
  }

  async update(
    id: string,
    dto: UpdateActivityDto,
  ) {
    await this.findOne(id);

    return this.prisma.activity.update({
      where: {
        id,
      },

      data: {
        titulo: dto.titulo,
        descripcion: dto.descripcion,
        tipo: dto.tipo,
        realizada: dto.realizada,

        ...(dto.fecha && {
          fecha: new Date(dto.fecha),
        }),

        ...(dto.companyId && {
          company: {
            connect: {
              id: dto.companyId,
            },
          },
        }),

        ...(dto.prospectId && {
          prospect: {
            connect: {
              id: dto.prospectId,
            },
          },
        }),

        ...(dto.userId && {
          user: {
            connect: {
              id: dto.userId,
            },
          },
        }),
      },

      include: {
        company: true,
        prospect: true,
        user: true,
      },
    });
  }

  async remove(id: string) {
    await this.findOne(id);

    return this.prisma.activity.delete({
      where: {
        id,
      },
    });
  }
}