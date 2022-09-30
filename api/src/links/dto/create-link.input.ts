import { Field, InputType } from '@nestjs/graphql';
import { IsUrl } from 'class-validator';

@InputType()
export class CreateLinkInput {
  @Field()
  @IsUrl()
  path: string;
}
