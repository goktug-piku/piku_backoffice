import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class KycDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  walletAddress: string;
} 