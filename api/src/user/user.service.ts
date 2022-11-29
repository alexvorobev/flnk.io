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
import { UpdateUserInput } from './dto/updateUser.input';

type UpdateUserArgs = UpdateUserInput & {
  currentUser: User;
};

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

  public async getUsers(user: User): Promise<User[]> {
    if (user.role !== UserRoles.ADMIN) {
      throw new UnauthorizedException('You are not allowed to do this');
    }

    return this.prisma.user.findMany();
  }

  public async validateUser(userId: number): Promise<User> {
    return this.prisma.user.findUnique({
      where: {
        id: userId,
      },
    });
  }

  public async updateUser(updateUserInput: UpdateUserArgs): Promise<User> {
    const {
      id: userId,
      name,
      surname,
      email,
      password,
      newPassword,
      role,
      isBlocked,
      currentUser,
    } = updateUserInput;
    const id = Number(userId ?? currentUser.id);

    if (
      isBlocked &&
      currentUser.role === UserRoles.ADMIN &&
      id === currentUser.id
    ) {
      throw new UnauthorizedException('You are not allowed to do this');
    }

    if (currentUser.id !== id && currentUser.role !== UserRoles.ADMIN) {
      throw new UnauthorizedException('You are not allowed to do this');
    }

    const user = await this.prisma.user.findUnique({
      where: {
        id,
      },
    });

    const updatedUser: User = {
      ...user,
      name: name ?? user.name,
      surname: surname ?? user.surname,
    };

    if (password) {
      const comparedPassword = await bcrypt.compare(password, user.password);

      if (!comparedPassword) {
        throw new UnauthorizedException(
          "Can't find user with such email or password",
        );
      }

      const salt = await bcrypt.genSalt();
      updatedUser['email'] = email ?? user.email;
      updatedUser['password'] = newPassword
        ? await bcrypt.hash(newPassword, salt)
        : user.password;
    }

    if (currentUser.role === UserRoles.ADMIN) {
      updatedUser['role'] = UserRoles[role] ?? user.role;
      updatedUser['isBlocked'] = isBlocked ?? user.isBlocked;
    }

    return this.prisma.user.update({
      where: {
        id,
      },
      data: updatedUser,
    });
  }
}
