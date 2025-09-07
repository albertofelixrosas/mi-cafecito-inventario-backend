// src/auth/auth.service.ts
import { Injectable /* UnauthorizedException */ } from '@nestjs/common';
import { UsersService } from '../users/users.service'; // asume que tienes un UsersService
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UserPayload } from './dto/user-payload.interface';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
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

  login(user: UserPayload) {
    const payload = {
      username: user.username,
      sub: user.user_id,
      role: user.role,
    };

    const access_token = this.jwtService.sign(payload, { expiresIn: '60m' });
    // const refresh_token = this.jwtService.sign(payload, { expiresIn: '7d' });

    /*const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

    const tokenEntity = this.refreshTokenRepo.create({
      token: refresh_token,
      user: { user_id: user.user_id },
      expires_at: expiresAt,
    });

    await this.refreshTokenRepo.save(tokenEntity);
    */
    return {
      access_token,
      // refresh_token,
      username: user.username,
      role: user.role,
    };
  }
}
