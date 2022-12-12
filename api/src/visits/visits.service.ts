import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateVisitDto } from './dto/create-visit.dto';
import { uuid as uuidv4 } from 'uuidv4';
import * as uaParser from 'ua-parser-js';
import geoip from 'geoip-lite';

@Injectable()
export class VisitsService {
  constructor(private readonly prisma: PrismaService) {}
  async create(createVisitDto: CreateVisitDto) {
    const uuid = createVisitDto.uuid || uuidv4();
    const { ip, ua, link } = createVisitDto;
    const geo = geoip.lookup(ip);
    const parsedUA = uaParser(ua);
    const { browser, os, device, engine } = parsedUA;

    const visitor = createVisitDto
      ? await this.prisma.visitor.findUnique({
          where: {
            uuid: uuid,
          },
        })
      : await this.prisma.visitor.create({
          data: {
            uuid,
            ua,
            browser: browser.name,
            browserVersion: browser.version,
            engine: engine.engine,
            engineVersion: engine.version,
            os: os.name,
            osVersion: os.version,
            cpu: os.architecture,
            device: device.type,
            deviceType: device.type,
            deviceVendor: device.vendor,
          },
        });

    await this.prisma.visit.create({
      data: {
        link: +link,
        visitor: +visitor.id,
        ip,
        country: geo?.country,
        region: geo?.region,
        city: geo?.city,
      },
    });

    return { uuid };
  }
}
