import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType({ description: 'User access response' })
export class AuthToken {
  @Field(() => String, {
    description: "User's auth token",
  })
  token: string;
}
