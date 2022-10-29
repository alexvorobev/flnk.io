import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { User } from './models/user';
import { UserService } from './user.service';

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => User, { name: 'auth', nullable: true })
  auth(
    @Args('email') email: string,
    @Args('password') password: string,
  ): Promise<User> {
    return this.userService.authUser(email, password);
  }

  @Mutation(() => User, { name: 'signUp', nullable: true })
  async signUp(
    @Args('name') name: string,
    @Args('surname') surname: string,
    @Args('email') email: string,
    @Args('password') password: string,
  ): Promise<User> {
    return this.userService.signUp(name, surname, email, password);
  }
}
