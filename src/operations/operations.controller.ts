import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { AuditGuard } from '../audit/guards/audit.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { Role } from '../auth/enums/role.enum';
import { OperationsService } from './operations.service';
import { KycDto } from './dto/kyc.dto';
import { PriceSetDto } from './dto/price-set.dto';
import { TreasuryDto } from './dto/treasury.dto';

@ApiTags('operations')
@Controller('operations')
@UseGuards(JwtAuthGuard, RolesGuard, AuditGuard)
@ApiBearerAuth()
export class OperationsController {
  constructor(private readonly operationsService: OperationsService) {}

  @Post('kyc/whitelist')
  @Roles(Role.WHITELIST, Role.ADMIN)
  async kycWhitelist(@Body() kycDto: KycDto) {
    return this.operationsService.handleKycWhitelist(kycDto.walletAddress);
  }

  @Post('kyc/blacklist')
  @Roles(Role.BLACKLIST, Role.ADMIN)
  async kycBlacklist(@Body() kycDto: KycDto) {
    return this.operationsService.handleKycBlacklist(kycDto.walletAddress);
  }

  @Post('price/set')
  @Roles(Role.PRICESETTER, Role.ADMIN)
  async setPrices(@Body() priceSetDto: PriceSetDto) {
    return this.operationsService.handlePriceSet(
      priceSetDto.price,
    );
  }

  @Post('treasury')
  @Roles(Role.TREASURY, Role.ADMIN)
  async treasuryOperation(@Body() treasuryDto: TreasuryDto) {
    return this.operationsService.handleTreasuryOperation(
      treasuryDto.amount,
      treasuryDto.operation,
    );
  }
} 