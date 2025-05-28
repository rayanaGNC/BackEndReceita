import { Transform } from 'class-transformer';
import { IsString, IsDate, IsNumber } from 'class-validator';
import { parseISO } from 'date-fns';

export class CreateReservaDto {
  @IsString()
  nome: string;

  dataRes: string;

  @IsNumber()
  numMesa: number;

  @IsNumber()
  telefone: number;
}
