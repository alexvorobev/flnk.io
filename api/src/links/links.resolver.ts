import { UseGuards } from '@nestjs/common';
import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { User } from '@prisma/client';
import { CurrentUser } from 'src/decorators/current-user.decorator';
import { GqlAuthGuard } from 'src/guards/gql-auth.guard';
import { UpdateLinkInput } from './dto/updateLink.input';
import { LinksService } from './links.service';
import { Link } from './models/link';

@Resolver(() => Link)
@UseGuards(GqlAuthGuard)
export class LinksResolver {
  constructor(private readonly linksService: LinksService) {}

  @Query(() => [Link], { name: 'getLinks', nullable: true })
  getLinks(@CurrentUser() user: User): Promise<Link[]> {
    return this.linksService.getLinks(user);
  }

  @Mutation(() => Link, { name: 'createLink', nullable: true })
  async createLink(
    @CurrentUser() user: User,
    @Args('path') path: string,
    @Args('hash') hash?: string,
  ): Promise<Link> {
    const { id: userId } = user;
    return this.linksService.createLink(userId, path, hash);
  }

  @Mutation(() => Link, { name: 'updateLink', nullable: true })
  async updateLink(
    @CurrentUser() user: User,
    @Args('updateLinkInput') updateLinkInput: UpdateLinkInput,
  ): Promise<Link> {
    return this.linksService.updateLink(updateLinkInput, user);
  }

  @Mutation(() => Link, { name: 'deleteLink', nullable: true })
  async deleteLink(
    @CurrentUser() user: User,
    @Args('id') id: number,
  ): Promise<Link> {
    return this.linksService.deleteLink(id, user);
  }
}
