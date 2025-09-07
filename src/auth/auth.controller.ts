// src/auth/auth.controller.ts
import { Controller, Post, Body, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public } from './public.decorator';
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
  async login(@Body() body: LoginDto) {
    try {
      if (!body.identifier || !body.password) {
        throw new UnauthorizedException('Credenciales incompletas');
      }
      const user = await this.authService.validateUser(
        body.identifier,
        body.password,
      );
      if (!user) {
        throw new UnauthorizedException('Credenciales incorrectas');
      }
      return this.authService.login({
        role: user.role,
        username: user.username,
        user_id: user.userId,
      });
    } catch (error) {
      // Manejar errores específicos de validación
      if (error instanceof UnauthorizedException) {
        // Log the error for debugging purposes
        throw error; // Re-throw the error to be handled by the global exception filter
      }
      // Log cualquier otro error inesperado
      if (error instanceof Error) {
        // Log the error for debugging purposes
        console.error('Error al iniciar sesión:', error.message);
      }
      throw new UnauthorizedException('Error al iniciar sesión');
    }
  }
}
