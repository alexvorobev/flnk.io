import { Field, ID, ObjectType } from '@nestjs/graphql';
import { UserRoles } from '@prisma/client';

@ObjectType({ description: 'User data entity' })
export class User {
  @Field(() => ID, { nullable: true })
  id?: number;

  @Field(() => String, {
    description: "User's name",
  })
  name: string;

  @Field(() => String, {
    description: "User's surname",
  })
  surname: string;

  @Field(() => String, {
    description: "User's email",
  })
  email: string;

  @Field(() => String, {
    description: "User's encrypted password",
  })
  password: string;

  @Field(() => String, {
    description: 'User role',
  })
  role: UserRoles;
}
