import { Module } from '@nestjs/common';
import { UserLogsService } from './user-logs.service';
import { UserLogsResolver } from './user-logs.resolver';

@Module({
  providers: [UserLogsResolver, UserLogsService],
})
export class UserLogsModule {}
