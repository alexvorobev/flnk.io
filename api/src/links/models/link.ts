import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType({ description: 'The main data about the links' })
export class Link {
  @Field(() => ID, { nullable: true })
  id?: number;

  @Field(() => String, {
    description:
      'The id of the link is a random or custom string that should define short id',
  })
  hash: string;

  @Field(() => String, {
    description: 'The path of the link is the url of the link',
  })
  path: string;
}