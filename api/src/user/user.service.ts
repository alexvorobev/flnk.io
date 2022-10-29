import * as bcrypt from 'bcrypt';
import { Injectable } from '@nestjs/common';
import { UserRoles } from '@prisma/client';
import { JwtService } from '@nestjs/jwt';

import { PrismaService } from 'src/prisma/prisma.service';
import { User } from './models/user';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService, private jswService: JwtService) {}

  public async authUser(email: string, password: string): Promise<User> {
    return {
      id: 1,
      name: '',
      surname: '',
      email,
      password,
      role: UserRoles.USER,
    };
  }

  public async signUp(
    name: string,
    surname: string,
    email: string,
    password: string,
  ): Promise<User> {
    console.log(process.env.BCRYPT_SALT);
    const hashedPassword = await bcrypt.hash(password, process.env.BCRYPT_SALT);

    return this.prisma.user.create({
      data: {
        name,
        surname,
        email,
        password: hashedPassword,
        role: UserRoles.USER,
      },
    });
  }

  public async validateUser(userId: number): Promise<User> {
    return this.prisma.user.findUnique({
      where: {
        id: userId,
      },
    });
  }
}
