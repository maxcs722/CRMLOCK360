import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';

@Injectable()
export class CompaniesService {
  constructor(
    private readonly prisma: PrismaService,
  ) {}

  async create(dto: CreateCompanyDto) {
    const exists = await this.prisma.company.findUnique({
      where: {
        rut: dto.rut,
      },
    });

    if (exists) {
      throw new BadRequestException(
        'Ya existe una empresa con ese RUT.',
      );
    }

    return this.prisma.company.create({
      data: {
        razonSocial: dto.razonSocial,
        nombreFantasia: dto.nombreFantasia,
        rut: dto.rut,
        giro: dto.giro,
        direccion: dto.direccion,
        comuna: dto.comuna,
        region: dto.region,
        telefono: dto.telefono,
        email: dto.email,
        sitioWeb: dto.sitioWeb,
        tipo: dto.tipo,
        origen: dto.origen,
        observaciones: dto.observaciones,
        activo: true,

        ...(dto.ejecutivoId && {
          ejecutivo: {
            connect: {
              id: dto.ejecutivoId,
            },
          },
        }),
      },

      include: {
        ejecutivo: true,
      },
    });
  }

  async findAll() {
    return this.prisma.company.findMany({
      include: {
        ejecutivo: true,
      },

      orderBy: {
        razonSocial: 'asc',
      },
    });
  }

  async findOne(id: string) {
    const company = await this.prisma.company.findUnique({
      where: {
        id,
      },

      include: {
        ejecutivo: true,
      },
    });

    if (!company) {
      throw new NotFoundException(
        'Empresa no encontrada.',
      );
    }

    return company;
  }

  async update(id: string, dto: UpdateCompanyDto) {
    await this.findOne(id);

    return this.prisma.company.update({
      where: {
        id,
      },

      data: {
        razonSocial: dto.razonSocial,
        nombreFantasia: dto.nombreFantasia,
        rut: dto.rut,
        giro: dto.giro,
        direccion: dto.direccion,
        comuna: dto.comuna,
        region: dto.region,
        telefono: dto.telefono,
        email: dto.email,
        sitioWeb: dto.sitioWeb,
        tipo: dto.tipo,
        origen: dto.origen,
        observaciones: dto.observaciones,

        ...(dto.ejecutivoId && {
          ejecutivo: {
            connect: {
              id: dto.ejecutivoId,
            },
          },
        }),
      },

      include: {
        ejecutivo: true,
      },
    });
  }

  async remove(id: string) {
    await this.findOne(id);

    return this.prisma.company.update({
      where: {
        id,
      },

      data: {
        activo: false,
      },
    });
  }
}