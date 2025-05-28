import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateReservaDto } from './dto/create-reserva.dto';
import { UpdateReservaDto } from './dto/update-reserva.dto';
import { Reserva } from './entities/reserva.entity';
import { PrismaService } from 'prisma/prisma.service';
import { parseISO } from 'date-fns';

@Injectable()
export class ReservaService {
  constructor(private prisma: PrismaService) {}

  private mapToEntity(reserva: any): Reserva {
    return {
      id: reserva.id,
      numMesa: reserva.numMesa,
      dataRes: reserva.dataRes,
      nome: reserva.nome,
      telefone: reserva.telefone,
    };
  }

  async create(createReservaDto: CreateReservaDto): Promise<Reserva> {
    const reserva = await this.prisma.reserva.create({
      data: {
        nome: createReservaDto.nome,
        numMesa: createReservaDto.numMesa,
        dataRes: createReservaDto.dataRes,
        telefone: createReservaDto.telefone,
      },
    });
    return this.mapToEntity(reserva);
  }

  async findAll(nome?: string, telefone?: number): Promise<Reserva[]> {
    const reserva = await this.prisma.reserva.findMany({
      where: {
        nome: {
          contains: nome,
          mode: 'insensitive',
        },
        telefone: {
          equals: telefone,
        },
      },
      orderBy: {
        nome: 'asc',
      },
    });
    return reserva.map((reserva) => this.mapToEntity(reserva));
  }

  async findOne(id: string): Promise<Reserva> {
    const reserva = await this.prisma.reserva.findUnique({
      where: { id },
    });
    if (!reserva) {
      throw new NotFoundException(`This action returns a #${id} reserva`);
    }
    return this.mapToEntity(reserva);
  }

  async update(
    id: string,
    updateReservaDto: UpdateReservaDto,
  ): Promise<Reserva> {
    const reservaExistente = await this.prisma.reserva.findUnique({
      where: { id },
    });

    if (!reservaExistente) {
      throw new NotFoundException(`Reserva com ID ${id} não encontrada`);
    }

    const reservaAtualizada = await this.prisma.reserva.update({
      where: { id },
      data: {
        nome: updateReservaDto.nome,
        numMesa: updateReservaDto.numMesa,
        dataRes: updateReservaDto.dataRes,
        telefone: updateReservaDto.telefone,
      },
    });

    return this.mapToEntity(reservaAtualizada);
  }

  async remove(id: string): Promise<Reserva> {
    const reservaExistente = await this.prisma.reserva.findUnique({
      where: { id },
    });

    if (!reservaExistente) {
      throw new NotFoundException(`Reserva com ID ${id} não encontrada`);
    }

    const reservaRemovida = await this.prisma.reserva.delete({
      where: { id },
    });

    return this.mapToEntity(reservaRemovida);
  }
}
