import { Controller, Get, Param } from '@nestjs/common';
import { LinksService } from './links.service';

@Controller('links')
export class LinksController {
  constructor(private readonly linksService: LinksService) {}

  @Get('/:hash')
  async getLinkById(@Param('hash') inputHash) {
    const link = await this.linksService.getLinkByHash(inputHash);
    const { hash, path, isBlocked, isActive } = link ?? {};

    return {
      hash,
      path,
      isBlocked: isBlocked || !isActive,
    };
  }
}
