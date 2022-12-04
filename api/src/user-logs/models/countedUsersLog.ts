import { Field, ObjectType } from '@nestjs/graphql';
import { CountedList } from 'src/utils/getCountedList';
import { UserLog } from './userLog';

@ObjectType({ description: 'User actions log data' })
export class CountedUsersLog extends CountedList {
  @Field(() => [UserLog], { nullable: true })
  items?: UserLog[];
}
