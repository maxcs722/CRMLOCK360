import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class QuotesService {
  constructor(
    private readonly prisma: PrismaService,
  ) {}

  async create(dto: any) {
    return dto;
  }

  async findAll() {
    return [];
  }

  async findOne(id: string) {
    throw new NotFoundException(
      `Cotización ${id} no encontrada.`,
    );
  }

  async update(
    id: string,
    dto: any,
  ) {
    return dto;
  }

  async remove(id: string) {
    return {
      deleted: id,
    };
  }
}