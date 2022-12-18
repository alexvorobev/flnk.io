import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateVisitDto } from './dto/create-visit.dto';
import { uuid as uuidv4 } from 'uuidv4';
import * as uaParser from 'ua-parser-js';
import { lookup } from 'geoip-lite';

@Injectable()
export class VisitsService {
  constructor(private readonly prisma: PrismaService) {}
  async create(createVisitDto: CreateVisitDto) {
    const uuid = createVisitDto.uuid || uuidv4();
    const { ip, ua, link } = createVisitDto;
    const geo = lookup(ip);
    const parsedUA = uaParser(ua);
    const { browser, os, device, engine } = parsedUA;

    const linkData = await this.prisma.link.findUnique({
      where: {
        hash: link,
      },
    });

    const visitor = createVisitDto.uuid
      ? await this.prisma.visitor.findUnique({
          where: {
            uuid,
          },
        })
      : await this.prisma.visitor.create({
          data: {
            uuid,
            ua,
            browser: browser.name ?? 'null',
            browserVersion: browser.version ?? 'null',
            engine: engine.engine ?? 'null',
            engineVersion: engine.version ?? 'null',
            os: os.name ?? 'null',
            osVersion: os.version ?? 'null',
            cpu: os.architecture ?? 'null',
            device: device.type ?? 'null',
            deviceType: device.type ?? 'null',
            deviceVendor: device.vendor ?? 'null',
          },
        });

    await this.prisma.visit.create({
      data: {
        link: linkData.id,
        visitor: visitor.id,
        ip,
        country: geo?.country ?? 'null',
        region: geo?.region ?? 'null',
        city: geo?.city ?? 'null',
      },
    });

    return { uuid };
  }
}
