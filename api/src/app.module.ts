import { join } from 'path';
import { CacheModule, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';

import { LinksModule } from './links/links.module';
import { PrismaModule } from './prisma/prisma.module';
import { PrismaService } from './prisma/prisma.service';
import { REDIS_CACHE_OPTIONS } from './infra/redis.config';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { UserLogsModule } from './user-logs/user-logs.module';
import { UserLogsService } from './user-logs/user-logs.service';
import { VisitsModule } from './visits/visits.module';

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
    UserModule,
    AuthModule,
    UserLogsModule,
    VisitsModule,
  ],
  controllers: [],
  providers: [PrismaService, UserLogsService],
})
export class AppModule {}
