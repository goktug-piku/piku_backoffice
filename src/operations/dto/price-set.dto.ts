import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString, IsPositive } from 'class-validator';

export class PriceSetDto {
  @ApiProperty()
  @IsNumber()
  @IsPositive()
  price: number;
} 