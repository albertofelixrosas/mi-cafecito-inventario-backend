// src/auth/strategies/refresh-token.strategy.ts
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Request } from 'express';
import { JwtPayload } from '../types/jwt-payload';

@Injectable()
export class RefreshTokenStrategy extends PassportStrategy(
  Strategy,
  'jwt-refresh',
) {
  constructor(config: ConfigService) {
    const jwtRefreshSecret = config.get<string>('JWT_REFRESH_SECRET');
    if (!jwtRefreshSecret) {
      throw new Error(
        'JWT_REFRESH_SECRET is not defined in environment variables',
      );
    }
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // o cookie si usas cookies
      secretOrKey: jwtRefreshSecret,
      passReqToCallback: true,
    });
  }

  validate(req: Request, payload: JwtPayload) {
    const refreshToken = req.get('authorization')?.replace('Bearer', '').trim();
    return { ...payload, refreshToken };
  }
}
