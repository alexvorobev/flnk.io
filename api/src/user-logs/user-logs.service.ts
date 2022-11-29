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

  public async getLogs(id?: string | number) {
    const userId = id ? Number(id) : undefined;

    return this.prisma.userLog.findMany({
      where: {
        user: userId,
      },
      include: {
        author: true,
      },
    });
  }
}
