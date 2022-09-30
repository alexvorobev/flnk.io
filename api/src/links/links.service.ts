import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
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
  constructor(private prisma: PrismaService) {}

  public async getLinks(): Promise<Link[]> {
    return this.prisma.link.findMany();
  }

  public async createLink(path: string): Promise<Link> {
    const link = { hash: makeid(5), path };
    const createdLink = await this.prisma.link.create({
      data: {
        ...link,
      },
    });

    return createdLink;
  }

  public async updateLink(
    id: number,
    hash: string,
    path: string,
  ): Promise<Link> {
    return await this.prisma.link.update({
      where: {
        id,
      },
      data: {
        hash,
        path,
      },
    });
  }

  public async deleteLink(id: number): Promise<Link> {
    return await this.prisma.link.delete({
      where: {
        id,
      },
    });
  }
}
