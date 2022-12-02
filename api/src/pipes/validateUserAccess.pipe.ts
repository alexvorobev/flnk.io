import { Injectable, ForbiddenException, PipeTransform } from '@nestjs/common';
import { User } from '@prisma/client';

@Injectable()
export class ValidateUserAccessPipe implements PipeTransform {
  transform(user: User) {
    if (user.email && user.password && user.id) {
      if (user.isBlocked) {
        throw new ForbiddenException('User is blocked');
      }
    }

    return user;
  }
}
