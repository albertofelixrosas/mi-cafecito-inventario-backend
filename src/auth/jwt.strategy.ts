// src/auth/jwt.strategy.ts
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { JwtPayload } from './types/jwt-payload';
import { UserFromJwt } from './interfaces/user-from-jwt.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private config: ConfigService) {
    const jwtSecret = config.get<string>('JWT_SECRET');
    if (!jwtSecret) {
      throw new Error('JWT_SECRET is not defined in environment variables');
    }
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtSecret,
    });
  }

  validate(payload: JwtPayload): UserFromJwt {
    // payload es lo que firmaste en AuthService.login()
    // aquí devolvemos el "user" que se guardará en req.user
    return {
      userId: payload.sub,
      email: payload.email,
      roles: payload.roles || [],
      name: payload.name || '',
      lastname: payload.lastname || '',
      locationId: payload.locationId || '',
      sessionId: payload.sessionId || '',
    };
  }
}
