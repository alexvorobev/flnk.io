import { UseGuards } from '@nestjs/common';
import { Args, Query, Resolver } from '@nestjs/graphql';
import { User } from '@prisma/client';
import { ForbiddenError } from 'apollo-server-express';
import { CurrentUser } from 'src/decorators/current-user.decorator';
import { GqlAuthGuard } from 'src/guards/gql-auth.guard';
import { UserLog, UserLogAction, UserLogActionEntity } from './models/userLog';
import { UserLogsService } from './user-logs.service';

@Resolver(() => UserLog)
@UseGuards(GqlAuthGuard)
export class UserLogsResolver {
  constructor(private readonly userLogsService: UserLogsService) {}

  @Query(() => [UserLog], { name: 'getLogs', nullable: true })
  getLogs(
    @CurrentUser() user: User,
    @Args('users', { nullable: true, type: () => [String] })
    users?: string[],
    @Args('actions', { nullable: true, type: () => [String] })
    actions?: UserLogAction[],
    @Args('entities', { nullable: true, type: () => [String] })
    entities?: UserLogActionEntity[],
  ): Promise<UserLog[]> {
    if (user.role !== 'ADMIN') {
      throw new ForbiddenError('You are not allowed to do this');
    }

    return this.userLogsService.getLogs({
      users,
      actions,
      entities,
    });
  }
}
