// src/auth/auth.service.ts
import {
  ForbiddenException,
  Injectable /* UnauthorizedException */,
} from '@nestjs/common';
import { UsersService } from '../users/users.service'; // asume que tienes un UsersService
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UserPayload } from './dto/user-payload.interface';
import { User } from 'src/users/entities/user.entity';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private cfg: ConfigService,
  ) {}

  async validateUser(username: string, password: string): Promise<User | null> {
    // Buscar usuario por username, email o phoneNumber en UNA sola consulta
    const user = await this.usersService.findByUsernameOrEmailOrPhone(username);

    if (!user) {
      return null;
    }

    // Verificar la contraseña
    const isPasswordValid = await bcrypt.compare(password, user.passwordHash);
    if (!isPasswordValid) {
      return null;
    }

    return user;
  }

  async login(user: UserPayload) {
    const tokens = await this.getTokens(user.user_id);
    await this.updateRefreshToken(user.user_id, tokens.refreshToken);
    return {
      ...tokens,
      user: { user_id: user.user_id, fullName: user.fullName },
    };
  }

  async getTokens(userId: number) {
    const accessToken = await this.jwtService.signAsync(
      {
        sub: userId,
      },
      {
        secret: this.cfg.get('JWT_ACCESS_SECRET'),
        expiresIn: this.cfg.get('JWT_ACCESS_EXPIRES') || '15m',
      },
    );

    const refreshToken = await this.jwtService.signAsync(
      {
        sub: userId,
      },
      {
        secret: this.cfg.get('JWT_REFRESH_SECRET'),
        expiresIn: this.cfg.get('JWT_REFRESH_EXPIRES') || '7d',
      },
    );

    return { accessToken, refreshToken };
  }

  async updateRefreshToken(userId: number, refreshToken: string) {
    const hashedRefreshToken = await bcrypt.hash(refreshToken, 10);
    // Aquí usas tu UserRepository de TypeORM
    await this.usersService.update(userId, { hashedRefreshToken });
  }

  async refreshTokens(userId: number, refreshToken: string) {
    const user = await this.usersService.findOne(userId);
    if (!user || !user.hashedRefreshToken)
      throw new ForbiddenException('Access Denied');

    const tokenMatches = await bcrypt.compare(
      refreshToken,
      user.hashedRefreshToken,
    );
    if (!tokenMatches) throw new ForbiddenException('Access Denied');

    const tokens = await this.getTokens(userId);
    await this.updateRefreshToken(userId, tokens.refreshToken);

    return tokens;
  }
}
