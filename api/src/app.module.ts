import { join } from 'path';
import { CacheModule, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';

import { LinksModule } from './links/links.module';
import { PrismaModule } from './prisma/prisma.module';
import { PrismaService } from './prisma/prisma.service';
import { REDIS_CACHE_OPTIONS } from './infra/redis.config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    PrismaModule,
    LinksModule,
    CacheModule.register({
      ...REDIS_CACHE_OPTIONS,
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/generated-schema.gql'),
    }),
  ],
  controllers: [],
  providers: [PrismaService],
})
export class AppModule {}
