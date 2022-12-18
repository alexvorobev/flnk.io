import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType({ description: 'The main data about the visit' })
export class Visit {
  @Field(() => Number, { nullable: true })
  id: number;

  @Field(() => Number, { nullable: true })
  link: number;

  @Field(() => String, { nullable: true })
  ip: string;

  @Field(() => String, { nullable: true })
  country: string;

  @Field(() => String, { nullable: true })
  region: string;

  @Field(() => String, { nullable: true })
  city: string;
  @Field(() => Number, { nullable: true })
  visitor: number;

  @Field(() => String, { nullable: true })
  createdAt: Date;
}
