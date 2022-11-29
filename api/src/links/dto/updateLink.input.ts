import { InputType, Field, ID } from '@nestjs/graphql';

@InputType()
export class UpdateLinkInput {
  @Field(() => ID, { nullable: true })
  id?: number;

  @Field(() => String, { nullable: true })
  hash?: string;

  @Field(() => String, { nullable: true })
  path?: string;

  @Field(() => Boolean, { nullable: true })
  isActive?: boolean;

  @Field(() => Boolean, { nullable: true })
  isBlocked?: boolean;
}
