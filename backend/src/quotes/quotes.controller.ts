import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';

import { QuotesService } from './quotes.service';

import { Res } from '@nestjs/common';
import { Response } from 'express';
import { UpdateStatusDto } from './dto/update-status.dto';

@Controller('quotes')
export class QuotesController {
  constructor(
    private readonly quotesService: QuotesService,
  ) {}

  @Post()
  create(
    @Body() dto: any,
  ) {
    return this.quotesService.create(dto);
  }

  @Get()
  findAll() {
    return this.quotesService.findAll();
  }

  @Get(':id')
  findOne(
    @Param('id') id: string,
  ) {
    return this.quotesService.findOne(id);
  }

  @Get(':id/pdf')
async pdf(
  @Param('id') id: string,
  @Res() res: Response,
) {
  return this.quotesService.generatePdf(
    id,
    res,
  );
}

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() dto: any,
  ) {
    return this.quotesService.update(
      id,
      dto,
    );
  }

  @Patch(':id/status')
updateStatus(
  @Param('id') id: string,
  @Body() dto: UpdateStatusDto,
) {

  console.log("==== UPDATE STATUS ====");
  console.log(dto);

  return this.quotesService.updateStatus(
    id,
    dto.estado,
  );
}

  @Delete(':id')
  remove(
    @Param('id') id: string,
  ) {
    return this.quotesService.remove(id);
  }
}