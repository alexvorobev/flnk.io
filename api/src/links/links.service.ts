import {
  CACHE_MANAGER,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UserRoles } from '@prisma/client';
import { Cache } from 'cache-manager';

import { PrismaService } from 'src/prisma/prisma.service';
import { User } from 'src/user/models/user';
import { UpdateLinkInput } from './dto/updateLink.input';
import { Link } from './models/link';

function makeid(length) {
  let result = '';
  const characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

@Injectable()
export class LinksService {
  constructor(
    private prisma: PrismaService,
    @Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
  ) {}

  public async getLinks(user: User): Promise<Link[]> {
    if (user.role === UserRoles.ADMIN) {
      return this.prisma.link.findMany({
        include: {
          user: true,
        },
      });
    }

    return this.prisma.link.findMany({
      where: {
        createdBy: user.id,
      },
    });
  }

  public async getLinkByHash(hash: string): Promise<Link> {
    const link = await this.prisma.link.findFirst({
      where: {
        hash,
      },
    });
    this.cacheManager.set(link.hash, link.path);

    return link;
  }
  public async createLink(
    userId: number,
    path: string,
    hash?: string,
  ): Promise<Link> {
    const link = { hash: hash.length ? hash : makeid(5), path };
    const createdLink = await this.prisma.link.create({
      data: {
        ...link,
        createdBy: userId,
      },
    });

    await this.cacheManager.set(`link:${createdLink.hash}`, createdLink.path);

    return createdLink;
  }

  public async updateLink(updateLinkInput: UpdateLinkInput): Promise<Link> {
    const { id, hash, path, isActive, isBlocked } = updateLinkInput;

    const linkToUpdate = await this.prisma.link.findFirst({
      where: {
        id: Number(id),
      },
    });

    if (!linkToUpdate) {
      throw new NotFoundException(`Link with id ${id} not found`);
    }

    this.cacheManager.del(linkToUpdate.hash);

    const updated = await this.prisma.link.update({
      where: {
        id: Number(id),
      },
      data: {
        hash: hash ?? linkToUpdate.hash,
        path: path ?? linkToUpdate.path,
        isActive: isActive ?? linkToUpdate.isActive,
        isBlocked: isBlocked ?? linkToUpdate.isBlocked,
      },
    });
    this.cacheManager.set(`link:${updated.hash}`, updated.path);

    return updated;
  }

  public async deleteLink(id: number): Promise<Link> {
    const deleted = await this.prisma.link.delete({
      where: {
        id,
      },
    });

    this.cacheManager.del(`link:${deleted.hash}`);

    return deleted;
  }
}
