import { Injectable } from '@nestjs/common';
import { CreateLinkInput } from './dto/create-link.input';
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

  public createLink(path: string): Link {
    const link = { hash: 'newl', path };
    this.links.push(link);
    return link;
  }

  public updateLink(id: number, path: string): Link {
    const link = this.links.find((link) => link.id === id);
    link.path = path;
    return link;
  }

  public deleteLink(id: number): Link {
    const link = this.links.find((link) => link.id === id);
    this.links = this.links.filter((link) => link.id !== id);
    return link;
  }
}
