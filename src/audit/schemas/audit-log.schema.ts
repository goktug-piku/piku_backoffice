import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type AuditLogDocument = AuditLog & Document;

@Schema({ timestamps: true })
export class AuditLog {
  @Prop({ required: true })
  userId: string;

  @Prop({ required: true })
  userEmail: string;

  @Prop({ required: true })
  endpoint: string;

  @Prop({ required: true })
  method: string;

  @Prop({ type: [String] })
  userRoles: string[];

  @Prop({ type: Object })
  requestBody: Record<string, any>;

  @Prop({ type: Object })
  requestParams: Record<string, any>;

  @Prop({ type: Object })
  requestQuery: Record<string, any>;
}

export const AuditLogSchema = SchemaFactory.createForClass(AuditLog); 