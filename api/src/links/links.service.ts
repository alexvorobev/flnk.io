import { Injectable } from '@nestjs/common';
import { Link } from './models/link';

@Injectable()
export class LinksService {
  private links: Link[] = [
    {
      id: 123,
      hash: 'jkoor4',
      path: 'http://google.com',
    },
    {
      id: 124,
      hash: 'jklkr4',
      path: 'http://google.com',
    },
    {
      id: 125,
      hash: 'jkdwr4',
      path: 'http://google.com',
    },
    {
      id: 126,
      hash: 'jkhwr4',
      path: 'http://google.com',
    },
  ];

  public getLinks(): Link[] {
    return this.links;
  }

  public createLink(hash: string, path: string): Link {
    const randomId = Math.floor(Math.random() * 1000);
    const link = { id: randomId, hash, path };
    this.links.push(link);
    return link;
  }

  public updateLink(id: number, hash: string, path: string): Link {
    const link = this.links.find((link) => link.id === id);
    link.path = path;
    link.hash = hash;
    return link;
  }

  public deleteLink(id: number): Link {
    const link = this.links.find((link) => link.id === id);
    const deletingLink = { ...link };
    this.links = this.links.filter((link) => link.id !== id);
    return deletingLink;
  }
}
