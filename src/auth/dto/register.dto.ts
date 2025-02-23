import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MinLength, IsArray, IsOptional } from 'class-validator';
import { Role } from '../enums/role.enum';

export class RegisterDto {
  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsString()
  @MinLength(6)
  password: string;

  @ApiProperty({ enum: Role, isArray: true, required: false })
  @IsArray()
  @IsOptional()
  roles?: Role[];
} 