import { InputType, Field, ID } from '@nestjs/graphql';

@InputType()
export class UpdateUserInput {
  @Field(() => ID, { nullable: true })
  id?: number;

  @Field(() => String, { nullable: true })
  name?: string;

  @Field(() => String, { nullable: true })
  surname?: string;

  @Field(() => String, { nullable: true })
  email?: string;

  @Field(() => String, { nullable: true })
  password?: string;

  @Field(() => String, { nullable: true })
  newPassword?: string;

  @Field(() => String, { nullable: true })
  role?: string;

  @Field(() => Boolean, { nullable: true })
  isBlocked?: boolean;
}
