import { Module } from '@nestjs/common';
import { ReservaService } from './reserva.service';
import { ReservaController } from './reserva.controller';
import { PrismaService } from 'prisma/prisma.service';

@Module({
  controllers: [ReservaController],
  providers: [ReservaService, PrismaService],
})
export class ReservaModule {}
