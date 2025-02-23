import { Controller, Get, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';
import { RolesGuard } from './auth/guards/roles.guard';
import { Roles } from './auth/decorators/roles.decorator';
import { Role } from './auth/enums/role.enum';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}
}
