import { CacheModule, Module } from '@nestjs/common';
import { REDIS_CACHE_OPTIONS } from 'src/infra/redis.config';
import { LinksResolver } from './links.resolver';
import { LinksService } from './links.service';
import { LinksController } from './links.controller';
import { UserLogsService } from 'src/user-logs/user-logs.service';

@Module({
  imports: [
    CacheModule.register({
      ...REDIS_CACHE_OPTIONS,
    }),
  ],
  providers: [LinksResolver, LinksService, UserLogsService],
  controllers: [LinksController],
})
export class LinksModule {}
