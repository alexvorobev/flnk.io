import { Field, ID } from '@nestjs/graphql';
import { UserLogAction, UserLogActionEntity } from './userLog';

export class UserLogInput {
  @Field(() => ID, {
    description: 'Action author',
  })
  user: number;

  @Field(() => String, {
    description: 'Action type',
  })
  action: UserLogAction;

  @Field(() => String, {
    description: 'Action entity',
  })
  entity: UserLogActionEntity;

  @Field(() => String, {
    description: 'Action entity data',
  })
  entityData: string;
}
