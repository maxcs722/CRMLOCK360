import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';

import { ContactsService } from './contacts.service';

import { CreateContactDto } from './dto/create-contact.dto';
import { UpdateContactDto } from './dto/update-contact.dto';

@Controller('contacts')
export class ContactsController {
  constructor(
    private readonly contactsService: ContactsService,
  ) {}

  @Post()
  create(@Body() dto: CreateContactDto) {
    return this.contactsService.create(dto);
  }

  @Get()
  findAll() {
    return this.contactsService.findAll();
  }

  @Get('company/:companyId')
  findByCompany(
    @Param('companyId') companyId: string,
  ) {
    return this.contactsService.findByCompany(
      companyId,
    );
  }

  @Get(':id')
  findOne(
    @Param('id') id: string,
  ) {
    return this.contactsService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() dto: UpdateContactDto,
  ) {
    return this.contactsService.update(
      id,
      dto,
    );
  }

  @Delete(':id')
  remove(
    @Param('id') id: string,
  ) {

    console.log(
      'DELETE CONTACT:',
      id,
    );

    return this.contactsService.remove(
      id,
    );

  }
}