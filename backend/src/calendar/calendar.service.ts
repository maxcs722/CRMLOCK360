import { Injectable } from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class CalendarService {
  constructor(
    private readonly prisma: PrismaService,
  ) {}

  async getCalendar() {
    return this.prisma.activity.findMany({
      include: {
        user: true,
        prospect: true,
        company: true,
      },
      orderBy: {
        fecha: 'asc',
      },
    });
  }
}