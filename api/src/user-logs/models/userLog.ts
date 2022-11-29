import { Field, ID, ObjectType } from '@nestjs/graphql';
import { User } from 'src/user/models/user';

export enum UserLogAction {
  CREATE = 'CREATE',
  UPDATE = 'UPDATE',
  DELETE = 'DELETE',
  LOGIN = 'LOGIN',
  LOGOUT = 'LOGOUT',
}

export enum UserLogActionEntity {
  LINK = 'LINK',
  USER = 'USER',
}

@ObjectType({ description: 'User actions log data' })
export class UserLog {
  @Field(() => ID, { nullable: true })
  id?: number;

  @Field(() => User, {
    description: 'Action author',
  })
  user: User;

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
