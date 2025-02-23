import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './schemas/user.schema';
import * as bcrypt from 'bcrypt';
import { Role } from '../auth/enums/role.enum';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
  ) {}

  async findByEmail(email: string): Promise<UserDocument | null> {
    return this.userModel.findOne({ email }).exec();
  }

  async createUser(email: string, password: string, roles: Role[] = [Role.WHITELIST]): Promise<UserDocument> {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new this.userModel({
      email,
      password: hashedPassword,
      roles,
    });
    return user.save();
  }

  async findById(id: string): Promise<UserDocument | null> {
    return this.userModel.findById(id).exec();
  }
} 