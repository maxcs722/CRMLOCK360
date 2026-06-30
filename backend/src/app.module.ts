import { Module } from '@nestjs/common';

import { PrismaModule } from './prisma/prisma.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CompaniesModule } from './companies/companies.module';
import { ContactsModule } from './contacts/contacts.module';
import { ProspectsModule } from './prospects/prospects.module';


@Module({
  imports: [
    PrismaModule,
    UsersModule,
    AuthModule,
    CompaniesModule,
    ContactsModule,
    ProspectsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}