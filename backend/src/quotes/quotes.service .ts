import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';

import { Prisma } from '@prisma/client';

import { CreateQuoteDto } from './dto/create-quote.dto';
import { UpdateQuoteDto } from './dto/update-quote.dto';

@Injectable()
export class QuotesService {
  constructor(
    private readonly prisma: PrismaService,
  ) {}

  async create(dto: CreateQuoteDto) {

    const lastQuote =
      await this.prisma.quote.findFirst({
        orderBy: {
          numero: 'desc',
        },
      });

    const numero =
      lastQuote?.numero
        ? lastQuote.numero + 1
        : 1;

    let subtotal = 0;
    let descuento = 0;

    for (const item of dto.items) {

      const cantidad =
        Number(item.cantidad);

      const precio =
        Number(item.precio);

      const desc =
        Number(item.descuento ?? 0);

      subtotal += cantidad * precio;

      descuento += desc;

    }

    const neto =
      subtotal - descuento;

    const iva =
      neto * 0.19;

    const total =
      neto + iva;

    return this.prisma.quote.create({

      data: {

        numero,

        estado: 'BORRADOR',

        observaciones:
          dto.observaciones,

        subtotal: new Prisma.Decimal(
          subtotal,
        ),

        descuento: new Prisma.Decimal(
          descuento,
        ),

        iva: new Prisma.Decimal(
          iva,
        ),

        total: new Prisma.Decimal(
          total,
        ),

        company: {
          connect: {
            id: dto.companyId,
          },
        },

        user: {
          connect: {
            id: dto.userId,
          },
        },

        items: {

          create: dto.items.map(
            (item) => {

              const cantidad =
                Number(item.cantidad);

              const precio =
                Number(item.precio);

              const desc =
                Number(
                  item.descuento ?? 0,
                );

              return {

                descripcion:
                  item.descripcion,

                cantidad:
                  new Prisma.Decimal(
                    cantidad,
                  ),

                precio:
                  new Prisma.Decimal(
                    precio,
                  ),

                descuento:
                  new Prisma.Decimal(
                    desc,
                  ),

                subtotal:
                  new Prisma.Decimal(
                    cantidad *
                      precio -
                      desc,
                  ),

              };

            },
          ),

        },

      },

      include: {
        company: true,
        user: true,
        items: true,
      },

    });

  }

  async findAll() {

  return this.prisma.quote.findMany({

    include: {

      company: {
        select: {
          id: true,
          razonSocial: true,
          nombreFantasia: true,
        },
      },

      user: {
        select: {
          id: true,
          nombre: true,
          apellido: true,
        },
      },

      items: true,

    },

    orderBy: {
      numero: "desc",
    },

  });

}

async findOne(id: string) {

  const quote =
    await this.prisma.quote.findUnique({

      where: {
        id,
      },

      include: {

        company: true,

        user: {
          select: {
            id: true,
            nombre: true,
            apellido: true,
          },
        },

        items: {
          orderBy: {
            descripcion: "asc",
          },
        },

      },

    });

  if (!quote) {

    throw new NotFoundException(
      "Cotización no encontrada.",
    );

  }

  return quote;

}

  async update(
  id: string,
  dto: UpdateQuoteDto,
) {

  await this.findOne(id);

  let subtotal = 0;
  let descuento = 0;

  for (const item of dto.items ?? []) {

    const cantidad =
      Number(item.cantidad);

    const precio =
      Number(item.precio);

    const desc =
      Number(item.descuento ?? 0);

    subtotal += cantidad * precio;

    descuento += desc;

  }

  const neto =
    subtotal - descuento;

  const iva =
    neto * 0.19;

  const total =
    neto + iva;

  return this.prisma.quote.update({

    where: {
      id,
    },

    data: {

      observaciones:
        dto.observaciones,

      subtotal:
        new Prisma.Decimal(subtotal),

      descuento:
        new Prisma.Decimal(descuento),

      iva:
        new Prisma.Decimal(iva),

      total:
        new Prisma.Decimal(total),

      ...(dto.companyId && {
        company: {
          connect: {
            id: dto.companyId,
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

      items: {

        deleteMany: {},

        create:
          (dto.items ?? []).map(
            (item) => {

              const cantidad =
                Number(item.cantidad);

              const precio =
                Number(item.precio);

              const desc =
                Number(
                  item.descuento ?? 0,
                );

              return {

                descripcion:
                  item.descripcion,

                cantidad:
                  new Prisma.Decimal(
                    cantidad,
                  ),

                precio:
                  new Prisma.Decimal(
                    precio,
                  ),

                descuento:
                  new Prisma.Decimal(
                    desc,
                  ),

                subtotal:
                  new Prisma.Decimal(
                    cantidad *
                      precio -
                      desc,
                  ),

              };

            },
          ),

      },

    },

    include: {

      company: true,

      user: true,

      items: true,

    },

  });

}

async remove(id: string) {

  await this.findOne(id);

  return this.prisma.quote.delete({

    where: {
      id,
    },

  });

}

}