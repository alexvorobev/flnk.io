import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserLogInput } from './models/userLog.input';
import { UserLogAction, UserLogActionEntity } from './models/userLog';

type GetLogsQueryArgs = {
  users?: string[];
  actions?: UserLogAction[];
  entities?: UserLogActionEntity[];
};
@Injectable()
export class UserLogsService {
  constructor(private prisma: PrismaService) {}

  public async pushLog(userLogInput: UserLogInput) {
    return this.prisma.userLog.create({
      data: userLogInput,
    });
  }

  public async getLogs(args: GetLogsQueryArgs) {
    const { actions, entities, users } = args;
    const userIds = users ? users.map((user) => Number(user)) : undefined;

    return this.prisma.userLog.findMany({
      where: {
        user: {
          in: userIds,
        },
        action: {
          in: actions,
        },
        entity: {
          in: entities,
        },
      },
      include: {
        author: true,
      },
    });
  }
}
