import { Field, ObjectType } from '@nestjs/graphql';
import { CountedList } from 'src/utils/getCountedList';
import { Link } from './link';

@ObjectType({ description: 'Counted list of the links' })
export class CountedLinks extends CountedList {
  @Field(() => [Link], { nullable: true })
  items?: Link[];
}
