import { Field, ObjectType } from '@nestjs/graphql';
import { CountedList } from 'src/utils/getCountedList';
import { CountedVisitsLink } from './countedVisitsLink';

@ObjectType({ description: 'Counted list of the links' })
export class CountedLinks extends CountedList {
  @Field(() => [CountedVisitsLink], { nullable: true })
  items?: CountedVisitsLink[];
}
