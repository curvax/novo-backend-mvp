import { HttpModule } from '@nestjs/axios/dist';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaService } from 'src/prisma/prisma.service';
import { AssinaturaController } from './assinatura.controller';
import { AssinaturaService } from './assinatura.service';

@Module({
  imports: [
    HttpModule,
    ConfigModule
  ],
  controllers: [AssinaturaController],
  providers: [
    PrismaService, AssinaturaService
  ],
  exports: [AssinaturaService]
})
export class AssinaturaModule {}