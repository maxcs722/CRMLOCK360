import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';

import { ProspectsService } from './prospects.service';
import { CreateProspectDto } from './dto/create-prospect.dto';
import { UpdateProspectDto } from './dto/update-prospect.dto';

@Controller('prospects')
export class ProspectsController {
  constructor(
    private readonly prospectsService: ProspectsService,
  ) {}

  @Post()
  create(@Body() dto: CreateProspectDto) {
    return this.prospectsService.create(dto);
  }

  @Get()
  findAll() {
    return this.prospectsService.findAll();
  }

  // ← AGREGAR ESTE MÉTODO
  @Get('pipeline')
  getPipeline() {
    return this.prospectsService.getPipeline();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.prospectsService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() dto: UpdateProspectDto,
  ) {
    return this.prospectsService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.prospectsService.remove(id);
  }
}