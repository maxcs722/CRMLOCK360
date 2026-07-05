import { Module } from '@nestjs/common';

import { PrismaModule } from './prisma/prisma.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { CompaniesModule } from './companies/companies.module';
import { ContactsModule } from './contacts/contacts.module';
import { ProspectsModule } from './prospects/prospects.module';
import { ActivitiesModule } from './activities/activities.module';
import { DashboardModule } from './dashboard/dashboard.module';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CalendarController } from './calendar/calendar.controller';
import { CalendarService } from './calendar/calendar.service';
import { CalendarModule } from './calendar/calendar.module';
import { QuotesModule } from './quotes/quotes.module';


@Module({
  imports: [
    PrismaModule,
    UsersModule,
    AuthModule,
    CompaniesModule,
    ContactsModule,
    ProspectsModule,
    ActivitiesModule,
    DashboardModule,
    CalendarModule,
    QuotesModule,
  ],
  controllers: [AppController, CalendarController],
  providers: [AppService, CalendarService],
})
export class AppModule {}