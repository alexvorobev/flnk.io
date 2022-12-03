import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserLogInput } from './models/userLog.input';
import { UserLogAction, UserLogActionEntity } from './models/userLog';

type GetLogsQueryArgs = {
  users?: string[];
  actions?: UserLogAction[];
  entities?: UserLogActionEntity[];
  dates?: string[];
  body?: string;
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
    const { actions, entities, users, body } = args;
    const userIds = users ? users.map((user) => Number(user)) : undefined;
    let dateFrom = undefined;
    let dateTo = undefined;

    if (args.dates && args.dates.length === 2) {
      dateFrom = new Date(args.dates[0]);
      dateTo = new Date(args.dates[1]);
    }

    return this.prisma.userLog.findMany({
      where: {
        user: {
          in: userIds,
        },
        entityData: {
          contains: body,
        },
        action: {
          in: actions,
        },
        entity: {
          in: entities,
        },
        createdAt: {
          gte: dateFrom,
          lte: dateTo,
        },
      },
      include: {
        author: true,
      },
    });
  }
}
