import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({
    example: 'usuario@example.com',
    description: 'Correo del usuario',
  })
  email: string;

  @ApiProperty({ example: '123456', description: 'Contraseña del usuario' })
  password: string;
}
