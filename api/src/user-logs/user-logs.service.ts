import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserLogInput } from './models/userLog.input';
import { UserLog, UserLogAction, UserLogActionEntity } from './models/userLog';
import { CountedListType, getCountedList } from 'src/utils/getCountedList';

type GetLogsQueryArgs = {
  users?: string[];
  actions?: UserLogAction[];
  entities?: UserLogActionEntity[];
  dates?: string[];
  body?: string;
  cursor?: string;
};
@Injectable()
export class UserLogsService {
  constructor(private prisma: PrismaService) {}

  public async pushLog(userLogInput: UserLogInput) {
    return this.prisma.userLog.create({
      data: userLogInput,
    });
  }

  public async getLogs(
    args: GetLogsQueryArgs,
  ): Promise<CountedListType<UserLog[]>> {
    const { actions, entities, users, body } = args;
    const userIds = users ? users.map((user) => Number(user)) : undefined;
    let dateFrom = undefined;
    let dateTo = undefined;

    if (args.dates && args.dates.length === 2) {
      dateFrom = new Date(args.dates[0]);
      dateTo = new Date(args.dates[1]);
    }

    const query = {
      cursor: args.cursor ? { id: Number(args.cursor) } : undefined,
      skip: args.cursor ? 1 : 0,
      take: 10,
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
      orderBy: {
        createdAt: 'desc',
      },
    };

    return getCountedList(this.prisma, 'userLog', query);
  }
}
