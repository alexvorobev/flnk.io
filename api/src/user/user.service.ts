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
import { UserLogsService } from 'src/user-logs/user-logs.service';
import {
  UserLogAction,
  UserLogActionEntity,
} from 'src/user-logs/models/userLog';
import { CountedListType, getCountedList } from 'src/utils/getCountedList';

type UpdateUserArgs = UpdateUserInput & {
  currentUser: User;
};

@Injectable()
export class UserService {
  constructor(
    private prisma: PrismaService,
    private jswService: JwtService,
    private userLogService: UserLogsService,
  ) {}

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

    this.userLogService.pushLog({
      user: result.id,
      action: UserLogAction.LOGIN,
      entity: UserLogActionEntity.USER,
      entityData: '',
    });

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

    this.userLogService.pushLog({
      user: result.id,
      action: UserLogAction.CREATE,
      entity: UserLogActionEntity.USER,
      entityData: JSON.stringify({
        name: result.name,
        surname: result.surname,
        email: result.email,
        role: result.role,
      }),
    });

    return {
      token: this.jswService.sign({ userId: result.id }),
    };
  }

  public async getUsers(
    user: User,
    cursor?: string,
  ): Promise<CountedListType<User[]>> {
    if (user.role !== UserRoles.ADMIN) {
      throw new UnauthorizedException('You are not allowed to do this');
    }

    const query = {
      cursor: cursor ? { id: Number(cursor) } : undefined,
      take: 10,
      skip: cursor ? 1 : 0,
      orderBy: {
        createdAt: 'desc',
      },
    };

    return getCountedList(this.prisma, 'user', query);
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

    this.userLogService.pushLog({
      user: id,
      action: UserLogAction.UPDATE,
      entity: UserLogActionEntity.USER,
      entityData: JSON.stringify({
        name: updatedUser.name,
        surname: updatedUser.surname,
        email: updatedUser.email,
        role: updatedUser.role,
        isBlocked: updatedUser.isBlocked,
      }),
    });

    return this.prisma.user.update({
      where: {
        id,
      },
      data: updatedUser,
    });
  }
}
