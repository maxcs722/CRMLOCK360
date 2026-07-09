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

import path from "path";
import * as fs from "fs";

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
    size: "A4",
    margin: 35,
    bufferPages: true,
  });

  res.setHeader(
    "Content-Type",
    "application/pdf",
  );

  res.setHeader(
    "Content-Disposition",
    `inline; filename=Cotizacion-${quote.numero}.pdf`,
  );

  doc.pipe(res);

  //-------------------------------------------------
  // CONFIGURACIÓN
  //-------------------------------------------------

  const PAGE_WIDTH = 595;
  const PAGE_HEIGHT = 842;

  const LEFT = 40;
  const RIGHT = 555;

  let y = 40;

  //-------------------------------------------------
  // LOGO
  //-------------------------------------------------

  try {

    const logo = path.join(
      process.cwd(),
      "assets",
      "logo-lock360.png",
    );

   console.log(process.cwd());

   console.log(logo);

   console.log(fs.existsSync(logo));

    if (fs.existsSync(logo)) {

      doc.image(
        logo,
        30,
        20,
        {
         width: 220,
      },
    );

    }

  } catch {}

  //-------------------------------------------------
  // TITULO
  //-------------------------------------------------

  doc

    .font("Helvetica-Bold")

    .fontSize(24)

    .fillColor("#0D5CAB")

    .text(

      "COTIZACIÓN",

      330,

      45,

      {

        width: 190,

        align: "center",

      },

    );

  doc

    .roundedRect(
      360,
      82,
      150,
      34,
      4,
    )

    .fill("#0D5CAB");

  doc

    .fillColor("white")

    .fontSize(16)

    .text(

      `N° ${String(
        quote.numero,
      ).padStart(6, "0")}`,

      360,

      91,

      {

        width: 150,

        align: "center",

      },

    );

  doc.fillColor("black");

  //-------------------------------------------------
  // DATOS EMPRESA
  //-------------------------------------------------

  y = 135;

  doc

    .font("Helvetica")

    .fontSize(10);

  doc.text(
    "AGENDA TUS TRABAJOS AQUI:",
    LEFT,
    y,
  );

  doc.text(
    "WWW.LOCK360.CL",
    LEFT,
    y + 15,
  );

  doc.text(
    "WSP +569 2016 7487",
    LEFT,
    y + 30,
  );

  //-------------------------------------------------
  // FECHA
  //-------------------------------------------------

  doc.text(

    `Fecha : ${new Date(
      quote.fecha,
    ).toLocaleDateString("es-CL")}`,

    350,

    y,

  );

  doc.text(

    `Estado : ${quote.estado}`,

    350,

    y + 15,

  );

  //-------------------------------------------------
  // LINEA
  //-------------------------------------------------

  doc

    .moveTo(
      LEFT,
      190,
    )

    .lineTo(
      RIGHT,
      190,
    )

    .lineWidth(2)

    .strokeColor("#0D5CAB")

    .stroke();

  //-------------------------------------------------
  // DATOS CLIENTE
  //-------------------------------------------------

  y = 205;

  doc

    .roundedRect(
      LEFT,
      y,
      515,
      120,
      4,
    )

    .stroke("#D9D9D9");

  doc

    .rect(
      LEFT,
      y,
      515,
      28,
    )

    .fill("#0D5CAB");

  doc

    .fillColor("white")

    .font("Helvetica-Bold")

    .fontSize(12)

    .text(
      "DATOS DEL CLIENTE",
      LEFT + 10,
      y + 8,
    );

  doc.fillColor("black");

  doc

    .font("Helvetica")

    .fontSize(10);

  let row = y + 42;

  doc.text(
    "Cliente:",
    55,
    row,
  );

  doc.text(
    quote.company.nombreFantasia ??
      quote.company.razonSocial,
    130,
    row,
  );

  row += 18;

  doc.text(
    "Razón Social:",
    55,
    row,
  );

  doc.text(
    quote.company.razonSocial,
    130,
    row,
  );

  row += 18;

  doc.text(
    "Dirección:",
    55,
    row,
  );

  doc.text(
    quote.company.direccion ?? "-",
    130,
    row,
  );

  row = y + 42;

  doc.text(
    "Comuna:",
    320,
    row,
  );

  doc.text(
    quote.company.comuna ?? "-",
    390,
    row,
  );

  row += 18;

  doc.text(
    "Teléfono:",
    320,
    row,
  );

  doc.text(
    quote.company.telefono ?? "-",
    390,
    row,
  );

  row += 18;

  doc.text(
    "Ejecutivo:",
    320,
    row,
  );

  doc.text(
    `${quote.user.nombre} ${quote.user.apellido}`,
    390,
    row,
  );

  //-------------------------------------------------
  // POSICIÓN INICIAL
  //-------------------------------------------------

  let currentY = 350;

 //-------------------------------------------------
// TABLA DE PRODUCTOS
//-------------------------------------------------

doc

  .roundedRect(
    LEFT,
    currentY,
    515,
    26,
    3,
  )

  .fill("#0D5CAB");

doc

  .fillColor("white")

  .font("Helvetica-Bold")

  .fontSize(10);

doc.text("Descripción", 50, currentY + 8);

doc.text("Cant.", 320, currentY + 8);

doc.text("Precio", 365, currentY + 8);

doc.text("Desc.", 435, currentY + 8);

doc.text("Total", 495, currentY + 8);

currentY += 30;

doc

  .fillColor("black")

  .font("Helvetica")

  .fontSize(10);

for (const item of quote.items) {

  //-------------------------------------------------
  // SI NO CABE LA FILA SE CREA OTRA PÁGINA
  //-------------------------------------------------

  if (currentY > 690) {

    doc.addPage();

    currentY = 50;

    doc

      .roundedRect(
        LEFT,
        currentY,
        515,
        26,
        3,
      )

      .fill("#0D5CAB");

    doc

      .fillColor("white")

      .font("Helvetica-Bold")

      .fontSize(10);

    doc.text(
      "Descripción",
      50,
      currentY + 8,
    );

    doc.text(
      "Cant.",
      320,
      currentY + 8,
    );

    doc.text(
      "Precio",
      365,
      currentY + 8,
    );

    doc.text(
      "Desc.",
      435,
      currentY + 8,
    );

    doc.text(
      "Total",
      495,
      currentY + 8,
    );

    currentY += 30;

    doc

      .fillColor("black")

      .font("Helvetica")

      .fontSize(10);

  }

  doc

    .rect(
      LEFT,
      currentY,
      515,
      24,
    )

    .strokeColor("#E5E7EB")

    .stroke();

  doc.text(

    item.descripcion,

    50,

    currentY + 7,

    {

      width: 240,

    },

  );

  doc.text(

    Number(
      item.cantidad,
    ).toLocaleString("es-CL"),

    315,

    currentY + 7,

    {

      width: 35,

      align: "center",

    },

  );

  doc.text(

    "$ " +

      Number(
        item.precio,
      ).toLocaleString("es-CL"),

    355,

    currentY + 7,

    {

      width: 60,

      align: "right",

    },

  );

  doc.text(

    "$ " +

      Number(
        item.descuento,
      ).toLocaleString("es-CL"),

    425,

    currentY + 7,

    {

      width: 55,

      align: "right",

    },

  );

  doc.text(

    "$ " +

      Number(
        item.subtotal,
      ).toLocaleString("es-CL"),

    485,

    currentY + 7,

    {

      width: 60,

      align: "right",

    },

  );

  currentY += 24;

}

//-------------------------------------------------
// ESPACIO DESPUÉS DE LA TABLA
//-------------------------------------------------

currentY += 20;

 //-------------------------------------------------
// RESUMEN ECONÓMICO
//-------------------------------------------------

// Si no cabe el resumen
if (currentY > 610) {

  doc.addPage();

  currentY = 50;

}

const resumenX = 300;
const resumenWidth = 255;
const tituloX = 310;
const textoX = 315;
const valorX = 430;
const valorWidth = 105;

doc

  .roundedRect(
    resumenX,
    currentY,
    resumenWidth,
    110,
    4,
  )

  .strokeColor("#D5D5D5")

  .stroke();

doc

  .rect(
    resumenX,
    currentY,
    resumenWidth,
    28,
  )

  .fill("#0D5CAB");

doc

  .fillColor("white")

  .font("Helvetica-Bold")

  .fontSize(11)

  .text(
    "RESUMEN ECONÓMICO",
    tituloX,
    currentY + 8,
  );

doc.fillColor("black");

let resumenY = currentY + 42;

doc

  .font("Helvetica")

  .fontSize(11);

//---------------------------
// SUBTOTAL
//---------------------------

doc.text(
  "Subtotal",
  textoX,
  resumenY,
);

doc.text(
  `$ ${Number(
    quote.subtotal,
  ).toLocaleString("es-CL")}`,
  valorX,
  resumenY,
  {
    width: valorWidth,
    align: "right",
  },
);

resumenY += 22;

//---------------------------
// IVA
//---------------------------

doc.text(
  "IVA (19%)",
  textoX,
  resumenY,
);

doc.text(
  `$ ${Number(
    quote.iva,
  ).toLocaleString("es-CL")}`,
  valorX,
  resumenY,
  {
    width: valorWidth,
    align: "right",
  },
);

resumenY += 24;

//---------------------------
// Línea
//---------------------------

doc

  .moveTo(
    textoX,
    resumenY,
  )

  .lineTo(
    545,
    resumenY,
  )

  .strokeColor("#CCCCCC")

  .stroke();

resumenY += 10;

//---------------------------
// TOTAL
//---------------------------

doc

  .font("Helvetica-Bold")

  .fontSize(16);

doc.text(
  "TOTAL",
  textoX,
  resumenY,
);

doc.text(
  `$ ${Number(
    quote.total,
  ).toLocaleString("es-CL")}`,
  valorX,
  resumenY,
  {
    width: valorWidth,
    align: "right",
  },
);

currentY += 130;

 //-------------------------------------------------
// OBSERVACIONES
//-------------------------------------------------

const observaciones =

  quote.observaciones?.trim() ||

  "Sin observaciones.";

// Calculamos la altura real del texto
const textHeight = doc.heightOfString(
  observaciones,
  {
    width: 495,
  },
);

// Altura mínima de la caja
const boxHeight = Math.max(
  60,
  textHeight + 35,
);

// Si no cabe en la hoja
if (currentY + boxHeight > 690) {

  doc.addPage();

  currentY = 50;

}

doc

  .roundedRect(
    40,
    currentY,
    515,
    boxHeight,
    4,
  )

  .strokeColor("#D8D8D8")

  .stroke();

doc

  .rect(
    40,
    currentY,
    515,
    28,
  )

  .fill("#0D5CAB");

doc

  .fillColor("white")

  .font("Helvetica-Bold")

  .fontSize(11)

  .text(
    "OBSERVACIONES",
    50,
    currentY + 8,
  );

doc

  .fillColor("black")

  .font("Helvetica")

  .fontSize(10)

  .text(

    observaciones,

    50,

    currentY + 38,

    {

      width: 495,

      align: "left",

    },

  );

// Dejamos la posición justo debajo
currentY += boxHeight + 20;

 //-------------------------------------------------
// CONDICIONES COMERCIALES y DATOS PARA ORDEN DE COMPRA
//-------------------------------------------------

const condiciones = [

  "• Oferta válida por 15 días.",

  "• Garantía: 12 meses contra fallas de fabricación.",

  "• Forma de pago según acuerdo comercial.",

  "• DATOS PARA ORDEN DE COMPRA.",

  "• LOCK360 SpA.",

  "• 78.453.977-6",

  "• Giro: Telecomunicaciones y servicios",

  "• Antonio Bellet 193,Of.1210 Providencia Santiago, Chile.",

  

];

// Calculamos la altura necesaria
const condicionesHeight =
  35 + condiciones.length * 18;

// Si no alcanza el espacio disponible
if (currentY + condicionesHeight > 690) {

  doc.addPage();

  currentY = 50;

}

doc

  .roundedRect(
    40,
    currentY,
    515,
    condicionesHeight,
    4,
  )

  .strokeColor("#D8D8D8")

  .stroke();

doc

  .rect(
    40,
    currentY,
    515,
    28,
  )

  .fill("#0D5CAB");

doc

  .fillColor("white")

  .font("Helvetica-Bold")

  .fontSize(11)

  .text(
    "CONDICIONES COMERCIALES Y DATOS PARA ORDEN DE COMPRA",
    50,
    currentY + 8,
  );

doc

  .fillColor("black")

  .font("Helvetica")

  .fontSize(10);

let condicionesY = currentY + 40;

for (const linea of condiciones) {

  doc.text(
    linea,
    55,
    condicionesY,
  );

  condicionesY += 18;

}

currentY += condicionesHeight + 20;

//-------------------------------------------------
// FIRMA
//-------------------------------------------------

const firmaHeight = 90;

// Si no cabe la firma, la enviamos a la página siguiente
if (currentY + firmaHeight > 730) {

  doc.addPage();

  currentY = 60;

}

doc

  .moveTo(
    70,
    currentY + 30,
  )

  .lineTo(
    260,
    currentY + 30,
  )

  .strokeColor("#777777")

  .stroke();

doc

  .font("Helvetica-Bold")

  .fontSize(11)

  .fillColor("black")

  .text(
    "Victor Figueroa",
    90,
    currentY + 38,
  );

doc

  .font("Helvetica")

  .fontSize(10)

  .fillColor("#555555")

  .text(
    "Ejecutivo Comercial",
    90,
    currentY + 54,
  );

doc.text(
  "LOCK360",
  90,
  currentY + 68,
);

//-------------------------------------------------
// PIE DE PÁGINA
//-------------------------------------------------

const pages = doc.bufferedPageRange();

for (
  let i = 0;
  i < pages.count;
  i++
) {

  doc.switchToPage(i);

  const footerY = 795;

  doc

    .moveTo(
      40,
      footerY - 12,
    )

    .lineTo(
      555,
      footerY - 12,
    )

    .strokeColor("#DDDDDD")

    .stroke();

  doc

    .font("Helvetica")

    .fontSize(9)

    .fillColor("#666666");

  doc.text(
    "WWW.LOCK360.CL",
    40,
    footerY,
  );

  doc.text(
    "AGENDA TUS TRABAJOS AL WHATSAPP +56 9 2016 7487",
    200,
    footerY,
  );

  doc.text(
    `Página ${i + 1} de ${pages.count}`,
    440,
    footerY,
    {
      width: 100,
      align: "right",
    },
  );

}

//-------------------------------------------------
// FINALIZAR PDF
//-------------------------------------------------

doc.end();


  }
}