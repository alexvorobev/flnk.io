import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { LinksService } from './links.service';
import { Link } from './models/link';

@Resolver(() => Link)
export class LinksResolver {
  constructor(private readonly linksService: LinksService) {}

  @Query(() => [Link], { name: 'getLinks', nullable: true })
  getLinks(): Link[] {
    return this.linksService.getLinks();
  }

  @Mutation(() => Link, { name: 'createLink', nullable: true })
  createLink(@Args('hash') hash: string, @Args('path') path: string): Link {
    return this.linksService.createLink(hash, path);
  }

  @Mutation(() => Link, { name: 'updateLink', nullable: true })
  updateLink(
    @Args('id') id: number,
    @Args('hash') hash: string,
    @Args('path') path: string,
  ): Link {
    return this.linksService.updateLink(id, hash, path);
  }

  @Mutation(() => Link, { name: 'deleteLink', nullable: true })
  deleteLink(@Args('id') id: number): Link {
    return this.linksService.deleteLink(id);
  }
}
