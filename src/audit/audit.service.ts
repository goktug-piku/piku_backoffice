import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AuditLog, AuditLogDocument } from './schemas/audit-log.schema';

@Injectable()
export class AuditService {
  constructor(
    @InjectModel(AuditLog.name)
    private auditLogModel: Model<AuditLogDocument>,
  ) {}

  async createAuditLog(logData: Partial<AuditLog>): Promise<AuditLogDocument> {
    const auditLog = new this.auditLogModel(logData);
    return auditLog.save();
  }

  async getAuditLogs(filters: Partial<AuditLog> = {}) {
    return this.auditLogModel.find(filters).sort({ createdAt: -1 }).exec();
  }
} 