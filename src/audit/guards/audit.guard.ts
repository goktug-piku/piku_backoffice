import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuditService } from '../audit.service';

@Injectable()
export class AuditGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private auditService: AuditService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const { user, method, path, body, query, params } = request;

    if (user) {
      await this.auditService.createAuditLog({
        userId: user.userId,
        userEmail: user.email,
        userRoles: user.roles,
        endpoint: path,
        method: method,
        requestBody: body,
        requestParams: params,
        requestQuery: query,
      });
    }

    return true;
  }
} 