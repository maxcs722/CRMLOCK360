import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';

import { CreateProspectDto } from './dto/create-prospect.dto';
import { UpdateProspectDto } from './dto/update-prospect.dto';

@Injectable()
export class ProspectsService {
  constructor(
    private readonly prisma: PrismaService,
  ) {}

  async create(dto: CreateProspectDto) {
    return this.prisma.prospect.create({
      data: {
        titulo: dto.titulo,
        descripcion: dto.descripcion,
        servicio: dto.servicio,
        status: dto.status,
        valorEstimado: dto.valorEstimado,
        fechaContacto: dto.fechaContacto
          ? new Date(dto.fechaContacto)
          : null,
        proximaAccion: dto.proximaAccion
          ? new Date(dto.proximaAccion)
          : null,

        ...(dto.companyId && {
          company: {
            connect: {
              id: dto.companyId,
            },
          },
        }),

        ...(dto.ejecutivoId && {
          ejecutivo: {
            connect: {
              id: dto.ejecutivoId,
            },
          },
        }),
      },

      include: {
        company: true,
        ejecutivo: true,
      },
    });
  }

  async findAll() {
    return this.prisma.prospect.findMany({
      include: {
        company: true,
        ejecutivo: true,
      },

      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async findOne(id: string) {
    const prospect = await this.prisma.prospect.findUnique({
      where: {
        id,
      },

      include: {
        company: true,
        ejecutivo: true,
      },
    });

    if (!prospect) {
      throw new NotFoundException(
        'Prospecto no encontrado.',
      );
    }

    return prospect;
  }

  async update(
    id: string,
    dto: UpdateProspectDto,
  ) {
    await this.findOne(id);

    return this.prisma.prospect.update({
      where: {
        id,
      },

      data: {
        titulo: dto.titulo,
        descripcion: dto.descripcion,
        servicio: dto.servicio,
        status: dto.status,
        valorEstimado: dto.valorEstimado,
        fechaContacto: dto.fechaContacto
          ? new Date(dto.fechaContacto)
          : undefined,
        proximaAccion: dto.proximaAccion
          ? new Date(dto.proximaAccion)
          : undefined,

        ...(dto.companyId && {
          company: {
            connect: {
              id: dto.companyId,
            },
          },
        }),

        ...(dto.ejecutivoId && {
          ejecutivo: {
            connect: {
              id: dto.ejecutivoId,
            },
          },
        }),
      },

      include: {
        company: true,
        ejecutivo: true,
      },
    });
  }

  async remove(id: string) {
    await this.findOne(id);

    return this.prisma.prospect.delete({
      where: {
        id,
      },
    });
  }

  async getPipeline() {
    const prospects = await this.prisma.prospect.findMany({
      include: {
        company: true,
        ejecutivo: true,
        activities: {
          orderBy: {
            fecha: 'asc',
          },
        },
      },

      orderBy: {
        createdAt: 'asc',
      },
    });

    return {
      NUEVO: prospects.filter(
        (p) => p.status === 'NUEVO',
      ),

      CONTACTADO: prospects.filter(
        (p) => p.status === 'CONTACTADO',
      ),

      VISITA_AGENDADA: prospects.filter(
        (p) => p.status === 'VISITA_AGENDADA',
      ),

      LEVANTAMIENTO: prospects.filter(
        (p) => p.status === 'LEVANTAMIENTO',
      ),

      COTIZANDO: prospects.filter(
        (p) => p.status === 'COTIZANDO',
      ),

      NEGOCIACION: prospects.filter(
        (p) => p.status === 'NEGOCIACION',
      ),

      GANADO: prospects.filter(
        (p) => p.status === 'GANADO',
      ),

      PERDIDO: prospects.filter(
        (p) => p.status === 'PERDIDO',
      ),
    };
  }
}