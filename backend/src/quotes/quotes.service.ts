import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';

import {
  Prisma,
  QuoteStatus,
} from "@prisma/client";

import { CreateQuoteDto } from './dto/create-quote.dto';
import { UpdateQuoteDto } from './dto/update-quote.dto';

import PDFDocument from "pdfkit";
import { Response } from "express";

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

        subtotal:
          new Prisma.Decimal(
            subtotal,
          ),

        descuento:
          new Prisma.Decimal(
            descuento,
          ),

        iva:
          new Prisma.Decimal(
            iva,
          ),

        total:
          new Prisma.Decimal(
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

  async updateStatus(
  id: string,
  estado: QuoteStatus,
) {

  await this.findOne(id);

  return this.prisma.quote.update({

    where: {
      id,
    },

    data: {
      estado,
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


  async generatePdf(
  id: string,
  res: Response,
) {
  const quote = await this.findOne(id);

  const doc = new PDFDocument({
    margin: 50,
    size: 'A4',
  });

  res.setHeader(
    'Content-Type',
    'application/pdf',
  );

  res.setHeader(
    'Content-Disposition',
    `inline; filename=Cotizacion-${quote.numero}.pdf`,
  );

  doc.pipe(res);

  doc
    .fontSize(24)
    .text('LOCK360 CRM');

  doc.moveDown();

  doc
    .fontSize(18)
    .text(`Cotización Nº ${quote.numero}`);

  doc.moveDown();

  doc
    .fontSize(12)
    .text(
      `Cliente: ${
        quote.company.nombreFantasia ||
        quote.company.razonSocial
      }`,
    );

  doc.text(
    `Ejecutivo: ${quote.user.nombre} ${quote.user.apellido}`,
  );

  doc.text(
    `Fecha: ${new Date(
      quote.fecha,
    ).toLocaleDateString('es-CL')}`,
  );

  doc.moveDown();

  doc
    .fontSize(16)
    .text('Ítems');

  doc.moveDown(0.5);

  quote.items.forEach((item) => {

    doc.text(
      `${item.descripcion}`,
    );

    doc.text(
      `${item.cantidad} x $${Number(
        item.precio,
      ).toLocaleString('es-CL')}`,
    );

    doc.text(
      `Subtotal: $${Number(
        item.subtotal,
      ).toLocaleString('es-CL')}`,
    );

    doc.moveDown();

  });

  doc.moveDown();

  doc.text(
    `Subtotal: $${Number(
      quote.subtotal,
    ).toLocaleString('es-CL')}`,
  );

  doc.text(
    `IVA: $${Number(
      quote.iva,
    ).toLocaleString('es-CL')}`,
  );

  doc
    .fontSize(16)
    .text(
      `TOTAL: $${Number(
        quote.total,
      ).toLocaleString('es-CL')}`,
    );

  if (quote.observaciones) {

    doc.moveDown();

    doc
      .fontSize(14)
      .text('Observaciones');

    doc
      .fontSize(12)
      .text(quote.observaciones);

  }

  doc.end();
}


}