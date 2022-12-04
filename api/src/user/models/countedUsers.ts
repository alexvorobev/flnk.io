import { Field, ID, ObjectType } from '@nestjs/graphql';
import { CountedList } from 'src/utils/getCountedList';
import { User } from './user';

@ObjectType({ description: 'Users counted list' })
export class CountedUsers extends CountedList {
  @Field(() => [User], { nullable: true })
  items: User[];
}
