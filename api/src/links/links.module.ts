import { CacheModule, Module } from '@nestjs/common';
import { REDIS_CACHE_OPTIONS } from 'src/infra/redis.config';
import { LinksResolver } from './links.resolver';
import { LinksService } from './links.service';

@Module({
  imports: [
    CacheModule.register({
      ...REDIS_CACHE_OPTIONS,
    }),
  ],
  providers: [LinksResolver, LinksService],
})
export class LinksModule {}
