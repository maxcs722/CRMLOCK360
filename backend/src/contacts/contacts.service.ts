import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';

import { CreateContactDto } from './dto/create-contact.dto';
import { UpdateContactDto } from './dto/update-contact.dto';

@Injectable()
export class ContactsService {
  constructor(
    private readonly prisma: PrismaService,
  ) {}

  async create(dto: CreateContactDto) {
    return this.prisma.contact.create({
      data: {
        nombre: dto.nombre,
        apellido: dto.apellido,
        cargo: dto.cargo,
        telefono: dto.telefono,
        whatsapp: dto.whatsapp,
        email: dto.email,
        observaciones: dto.observaciones,

        company: {
          connect: {
            id: dto.companyId,
          },
        },
      },

      include: {
        company: true,
      },
    });
  }

  async findAll() {
    return this.prisma.contact.findMany({
      include: {
        company: true,
      },

      orderBy: {
        nombre: 'asc',
      },
    });
  }

  async findOne(id: string) {
    const contact =
      await this.prisma.contact.findUnique({
        where: {
          id,
        },

        include: {
          company: true,
        },
      });

    if (!contact) {
      throw new NotFoundException(
        'Contacto no encontrado.',
      );
    }

    return contact;
  }

  async findByCompany(companyId: string) {
    return this.prisma.contact.findMany({
      where: {
        companyId,
      },

      orderBy: {
        nombre: 'asc',
      },
    });
  }

  async update(
    id: string,
    dto: UpdateContactDto,
  ) {
    await this.findOne(id);

    return this.prisma.contact.update({
      where: {
        id,
      },

      data: {
        nombre: dto.nombre,
        apellido: dto.apellido,
        cargo: dto.cargo,
        telefono: dto.telefono,
        whatsapp: dto.whatsapp,
        email: dto.email,
        observaciones: dto.observaciones,

        ...(dto.companyId && {
          company: {
            connect: {
              id: dto.companyId,
            },
          },
        }),
      },

      include: {
        company: true,
      },
    });
  }

  async remove(id: string) {
    await this.findOne(id);

    return this.prisma.contact.delete({
      where: {
        id,
      },
    });
  }
}