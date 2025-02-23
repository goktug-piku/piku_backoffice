import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsEnum, IsPositive } from 'class-validator';

export enum TreasuryOperation {
  DEPOSIT = 'deposit',
  WITHDRAW = 'withdraw',
}

export class TreasuryDto {
  @ApiProperty()
  @IsNumber()
  @IsPositive()
  amount: number;

  @ApiProperty({ enum: TreasuryOperation })
  @IsEnum(TreasuryOperation)
  operation: TreasuryOperation;
} 