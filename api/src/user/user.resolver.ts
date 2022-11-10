import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AuthToken } from './models/authToken';
import { User } from './models/user';
import { UserService } from './user.service';

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => AuthToken, { name: 'auth', nullable: true })
  auth(
    @Args('email') email: string,
    @Args('password') password: string,
  ): Promise<AuthToken> {
    return this.userService.authUser(email, password);
  }

  @Mutation(() => AuthToken, { name: 'signUp', nullable: true })
  async signUp(
    @Args('name') name: string,
    @Args('surname') surname: string,
    @Args('email') email: string,
    @Args('password') password: string,
  ): Promise<AuthToken> {
    return this.userService.signUp(name, surname, email, password);
  }
}
