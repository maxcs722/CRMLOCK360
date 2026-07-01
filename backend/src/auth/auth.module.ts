import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { Reflector } from '@nestjs/core';

import { PrismaModule } from '../prisma/prisma.module';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './strategies/jwt.strategy';
import { RolesGuard } from './guards/roles.guard';

@Module({
  imports: [
    PrismaModule,

    PassportModule.register({
      defaultStrategy: 'jwt',
    }),

    JwtModule.register({
      secret: process.env.JWT_SECRET || 'Lock360CRM2026',
      signOptions: {
        expiresIn: '1d',
      },
    }),
  ],

  controllers: [
    AuthController,
  ],

  providers: [
    Reflector,
    AuthService,
    JwtStrategy,
    RolesGuard,
  ],

  exports: [
    PassportModule,
    JwtModule,
    AuthService,
    RolesGuard,
  ],
})
export class AuthModule {}