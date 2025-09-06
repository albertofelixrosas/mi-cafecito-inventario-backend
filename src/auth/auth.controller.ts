// src/auth/auth.controller.ts
import { Controller, Post, Body, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public } from './public.decorator';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { LoginDto } from './types/login';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';

@ApiTags('auth') // 👈 Agrupa endpoints en la sección "auth"
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @Post('login')
  @ApiOperation({ summary: 'Iniciar sesión con email y contraseña' })
  @ApiBody({ type: LoginDto, description: 'Credenciales del usuario' })
  @ApiResponse({
    status: 200,
    description: 'Inicio de sesión exitoso, retorna el token JWT',
    schema: {
      example: {
        access_token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
      },
    },
  })
  @ApiResponse({ status: 401, description: 'Credenciales incorrectas' })
  async login(@Body() dto: LoginDto) {
    const user = await this.authService.validateUser(dto.email, dto.password);
    if (!user) throw new UnauthorizedException('Credenciales incorrectas');
    return this.authService.login(user);
  }

  @Public()
  @Post('register')
  @ApiOperation({ summary: 'Registrar un nuevo usuario' })
  @ApiBody({ type: CreateUserDto, description: 'Datos para crear usuario' })
  @ApiResponse({
    status: 201,
    description: 'Usuario creado correctamente',
    schema: {
      example: {
        id: 1,
        email: 'usuario@example.com',
        name: 'Juan Pérez',
        createdAt: '2025-09-05T12:00:00.000Z',
      },
    },
  })
  @ApiResponse({ status: 400, description: 'Error en validación de datos' })
  async register(@Body() dto: CreateUserDto) {
    return this.authService.register(dto);
  }
}
