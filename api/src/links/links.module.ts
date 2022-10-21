import { CacheModule, Module } from '@nestjs/common';
import { REDIS_CACHE_OPTIONS } from 'src/infra/redis.config';
import { LinksResolver } from './links.resolver';
import { LinksService } from './links.service';
import { LinksController } from './links.controller';

@Module({
  imports: [
    CacheModule.register({
      ...REDIS_CACHE_OPTIONS,
    }),
  ],
  providers: [LinksResolver, LinksService],
  controllers: [LinksController],
})
export class LinksModule {}
