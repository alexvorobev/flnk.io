import { UseGuards } from '@nestjs/common';
import { Args, Query, Resolver } from '@nestjs/graphql';
import { User } from '@prisma/client';
import { CurrentUser } from 'src/decorators/current-user.decorator';
import { GqlAuthGuard } from 'src/guards/gql-auth.guard';
import { UserLog } from './models/userLog';
import { UserLogsService } from './user-logs.service';

@Resolver()
@UseGuards(GqlAuthGuard)
export class UserLogsResolver {
  constructor(private readonly userLogsService: UserLogsService) {}

  @Query(() => [UserLog], { name: 'getLogs', nullable: true })
  getLogs(@CurrentUser() user: User, @Args('id') id?: string): UserLog[] {
    console.log(id, user);

    return [];
  }
}
