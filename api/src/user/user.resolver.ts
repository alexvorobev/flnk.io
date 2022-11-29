import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CurrentUser } from 'src/decorators/current-user.decorator';
import { GqlAuthGuard } from 'src/guards/gql-auth.guard';
import { AuthToken } from './models/authToken';
import { UpdateUserInput } from './dto/updateUser.input';
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

  @Query(() => [User], { name: 'getUsers', nullable: true })
  @UseGuards(GqlAuthGuard)
  getUsers(@CurrentUser() user: User): Promise<User[]> {
    return this.userService.getUsers(user);
  }

  @UseGuards(GqlAuthGuard)
  @Query(() => User, { name: 'me', nullable: true })
  me(@CurrentUser() user: User): User {
    return user;
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

  @UseGuards(GqlAuthGuard)
  @Mutation(() => User, { name: 'updateUser', nullable: true })
  async updateUser(
    @Args('updateUserInput') updateUserInput: UpdateUserInput,
    @CurrentUser() user: User,
  ): Promise<User> {
    return this.userService.updateUser({
      ...updateUserInput,
      currentUser: user,
    });
  }
}
