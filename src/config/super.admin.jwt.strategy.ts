import {
  Injectable,
  UnauthorizedException,
  ForbiddenException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { PassportStrategy, AuthGuard } from '@nestjs/passport';
import { Model } from 'mongoose';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { Role, User } from 'src/schema/user.schema';
import * as bcrypt from 'bcrypt';

@Injectable()
export class SuperAdminJwtStrategy extends PassportStrategy(
  Strategy,
  'superAdminStrategy',
) {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<User>,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRETE_KEY,
    });
  }

  async validate(payload) {
    const { id } = payload;
    const adminUser = await this.userModel.findById(id);
    const adminHashString = adminUser.email + adminUser.role;
    if (!adminUser) throw new UnauthorizedException(null, 'Please login first');
    if (
      !adminUser.isAdmin ||
      !(adminUser.role === Role.SUPER_ADMIN) ||
      !(await bcrypt.compare(adminHashString, adminUser.adminHash))
    )
      throw new ForbiddenException(null, 'Access Denied');

    return adminUser.toObject();
  }
}
