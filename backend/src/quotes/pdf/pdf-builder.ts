import PDFDocument from "pdfkit";
import { Response } from "express";

export class PdfBuilder {

  private doc: any;

  constructor(
    private readonly res: Response,
  ) {

    this.doc = new PDFDocument({

      margin: 45,

      size: "A4",

    });

    this.doc.pipe(res);

  }

  get pdf() {

    return this.doc;

  }

  title(numero: number) {

    this.doc
      .fontSize(30)
      .font("Helvetica-Bold")
      .text("LOCK360");

    this.doc
      .fontSize(12)
      .font("Helvetica")
      .text("Servicios Integrales");

    this.doc.moveDown();

    this.doc
      .fontSize(22)
      .font("Helvetica-Bold")
      .text(
        `COTIZACIÓN Nº ${numero}`,
        {
          align: "right",
        },
      );

    this.doc.moveDown(2);

  }

  separator() {

    this.doc

      .moveTo(45, this.doc.y)

      .lineTo(550, this.doc.y)

      .stroke();

    this.doc.moveDown();

  }

  section(title: string) {

    this.doc

      .fontSize(15)

      .font("Helvetica-Bold")

      .text(title);

    this.doc.moveDown(0.5);

  }

  row(
    label: string,
    value: string,
  ) {

    this.doc

      .font("Helvetica-Bold")

      .text(label, {

        continued: true,

      })

      .font("Helvetica")

      .text(value);

  }

  finish() {

    this.doc.end();

  }

}