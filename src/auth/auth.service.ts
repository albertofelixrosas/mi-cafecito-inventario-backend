// src/auth/auth.service.ts
import { Injectable /* UnauthorizedException */ } from '@nestjs/common';
import { UsersService } from '../users/users.service'; // asume que tienes un UsersService
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/users/entities/user.entity';
import { CreateUserDto } from 'src/users/dto/create-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string) {
    const user = await this.usersService.findByEmail(email);
    if (!user) return null;
    const matched = await bcrypt.compare(password, user.passwordHash);
    if (!matched) return null;
    // Opcional: carga roles si no vienen cargadas
    return user;
  }

  login(user: User) {
    // firma un payload pequeño: sub (user id), email, roles[]
    const payload = {
      sub: user.userId,
      email: user.email,
      roles: (user.roles ?? []).map(r => r.name),
    };
    return {
      access_token: this.jwtService.sign(payload),
      // opcional: retorna info extra (user data, expiresAt, etc)
    };
  }

  async register(createDto: CreateUserDto) {
    const hash = await bcrypt.hash(createDto.password, 10);
    const user = await this.usersService.create({
      ...createDto,
      password: hash,
    });
    // no retornes passwordHash al frontend
    return user;
  }
}
