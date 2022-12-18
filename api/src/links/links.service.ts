import {
  CACHE_MANAGER,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UserRoles } from '@prisma/client';
import { Cache } from 'cache-manager';

import { PrismaService } from 'src/prisma/prisma.service';
import { UserLogsService } from 'src/user-logs/user-logs.service';
import { User } from 'src/user/models/user';
import {
  UserLogAction,
  UserLogActionEntity,
} from 'src/user-logs/models/userLog';
import { UpdateLinkInput } from './dto/updateLink.input';
import { Link } from './models/link';
import { CountedListType, getCountedList } from 'src/utils/getCountedList';

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
    private userLogs: UserLogsService,
    @Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
  ) {}

  public async getLinks(
    user: User,
    search?: string,
    cursor?: string,
  ): Promise<CountedListType<Link[]>> {
    const query = {
      cursor: cursor
        ? {
            id: Number(cursor),
          }
        : undefined,
      take: 10,
      skip: cursor ? 1 : 0,
      where: {
        OR: search
          ? [{ hash: { contains: search } }, { path: { contains: search } }]
          : undefined,
        createdBy: user.role !== UserRoles.ADMIN ? user.id : undefined,
      },
      include: {
        user: user.role === UserRoles.ADMIN,
        visits: {
          where: {
            createdAt: {
              gte: new Date(new Date().setDate(new Date().getDate() - 2)),
            },
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    };

    return getCountedList(this.prisma, 'link', query);
  }

  public async getLinkByHash(hash: string): Promise<Link> {
    const link = await this.prisma.link.findFirst({
      where: {
        hash,
      },
    });
    this.cacheManager.set(`link:${link.hash}`, link.path);

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

    this.userLogs.pushLog({
      user: userId,
      action: UserLogAction.CREATE,
      entity: UserLogActionEntity.LINK,
      entityData: JSON.stringify(createdLink),
    });

    return createdLink;
  }

  public async updateLink(
    updateLinkInput: UpdateLinkInput,
    user: User,
  ): Promise<Link> {
    const { id, hash, path, isActive, isBlocked } = updateLinkInput;

    const linkToUpdate = await this.prisma.link.findFirst({
      where: {
        id: Number(id),
      },
    });

    if (!linkToUpdate) {
      throw new NotFoundException(`Link with id ${id} not found`);
    }

    if (linkToUpdate.createdBy !== user.id && user.role !== UserRoles.ADMIN) {
      throw new NotFoundException(`You are not allowed to update this link`);
    }

    await this.cacheManager.del(linkToUpdate.hash);

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

    await this.cacheManager.set(`link:${updated.hash}`, updated.path);

    this.userLogs.pushLog({
      user: user.id,
      action: UserLogAction.UPDATE,
      entity: UserLogActionEntity.LINK,
      entityData: JSON.stringify(updated),
    });

    return updated;
  }

  public async deleteLink(id: number, user: User): Promise<Link> {
    const visitsToDelete = this.prisma.visit.deleteMany({
      where: {
        link: Number(id),
      },
    });
    const linkToDelete = this.prisma.link.findFirst({
      where: {
        id: Number(id),
      },
    });

    const [, deletedLink] = await this.prisma.$transaction([
      visitsToDelete,
      linkToDelete,
    ]);

    if (!deletedLink) {
      throw new NotFoundException(`Link not found`);
    }

    if (deletedLink.createdBy !== user.id && user.role !== UserRoles.ADMIN) {
      throw new NotFoundException(`You are not allowed to delete this link`);
    }

    const deleted = await this.prisma.link.delete({
      where: {
        id,
      },
    });

    this.userLogs.pushLog({
      user: user.id,
      action: UserLogAction.DELETE,
      entity: UserLogActionEntity.LINK,
      entityData: JSON.stringify(deleted),
    });

    this.cacheManager.del(`link:${deleted.hash}`);

    return deleted;
  }
}
