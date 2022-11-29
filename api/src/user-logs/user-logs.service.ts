import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserLogInput } from './models/userLog.input';

@Injectable()
export class UserLogsService {
  constructor(private prisma: PrismaService) {}

  public async pushLog(userLogInput: UserLogInput) {
    return this.prisma.userLog.create({
      data: userLogInput,
    });
  }
}
