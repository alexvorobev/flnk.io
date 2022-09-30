import { join } from 'path';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';

import { LinksModule } from './links/links.module';

@Module({
  imports: [
    LinksModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/generated-schema.gql'),
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
