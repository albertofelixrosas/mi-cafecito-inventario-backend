import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { JwtPayload } from '../types/jwt-payload';
import { UserFromJwt } from '../interfaces/user-from-jwt.interface';
import { UsersService } from '../../users/users.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private config: ConfigService,
    private usersService: UsersService,
  ) {
    const jwtSecret = config.get<string>('JWT_ACCESS_SECRET');
    if (!jwtSecret) {
      throw new Error(
        'JWT_ACCESS_SECRET is not defined in environment variables',
      );
    }

    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtSecret,
    });
  }

  async validate(payload: JwtPayload): Promise<UserFromJwt> {
    // Buscamos el usuario en la base de datos
    const user = await this.usersService.findOne(payload.sub);

    if (!user) {
      // opcional: lanzar error si el usuario ya no existe
      throw new Error('User not found');
    }

    return {
      userId: user.userId,
      email: user.email,
      phone: user.phone,
      name: user.name,
      lastname: user.lastname,
      role: user.role,
      permissions: user.userPermissions.map(p => p.permission.code),
    };
  }
}
