import * as bcrypt from 'bcrypt';
import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { UserRoles } from '@prisma/client';
import { JwtService } from '@nestjs/jwt';

import { PrismaService } from 'src/prisma/prisma.service';
import { User } from './models/user';
import { AuthToken } from './models/authToken';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService, private jswService: JwtService) {}

  public async authUser(email: string, password: string): Promise<AuthToken> {
    const result = await this.prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!result) {
      throw new NotFoundException();
    }

    const comparedPassword = await bcrypt.compare(password, result.password);

    if (!comparedPassword) {
      throw new UnauthorizedException(
        "Can't find user with such email or password",
      );
    }

    return {
      token: this.jswService.sign({ userId: result.id }),
    };
  }

  public async signUp(
    name: string,
    surname: string,
    email: string,
    password: string,
  ): Promise<AuthToken> {
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    const result = await this.prisma.user.create({
      data: {
        name,
        surname,
        email,
        password: hashedPassword,
        role: UserRoles.BASIC,
      },
    });

    return {
      token: this.jswService.sign({ userId: result.id }),
    };
  }

  public async validateUser(userId: number): Promise<User> {
    return this.prisma.user.findUnique({
      where: {
        id: userId,
      },
    });
  }
}
