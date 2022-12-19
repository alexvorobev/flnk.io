import { ObjectType, Field, ID } from '@nestjs/graphql';
import { User } from 'src/user/models/user';
import { Link } from './link';

@ObjectType({ description: 'Link visits stat' })
export class VisitsSummary {
  @Field(() => Number, {
    description: 'The link visits during the last 24 hours',
    nullable: true,
  })
  current: number;

  @Field(() => Number, {
    description: 'The link visits change in percentage',
    nullable: true,
  })
  change: number;
}

@ObjectType({ description: 'Counted visits list of the links' })
export class CountedVisitsLink implements Omit<Link, 'visits'> {
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

  @Field(() => User, {
    description: 'Link creator data',
    nullable: true,
  })
  user?: User;

  @Field(() => Boolean, {
    description: 'The link is active or not',
    nullable: true,
  })
  isActive?: boolean;

  @Field(() => Boolean, {
    description: 'The link is blocked or not',
    nullable: true,
  })
  isBlocked?: boolean;

  @Field(() => VisitsSummary, {
    description: 'The link visits',
    nullable: true,
  })
  visits: VisitsSummary;
}
