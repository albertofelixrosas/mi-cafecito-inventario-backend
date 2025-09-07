import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class LoginDto {
  @ApiProperty({
    examples: ['luiserro', '6421910021', 'luis.erro@gmail.com'],
    description:
      'Identificador del usuario (puede ser username, email o teléfono)',
    name: 'identifier',
  })
  @IsNotEmpty()
  @IsString()
  identifier: string;

  @ApiProperty({ example: '123456', description: 'Contraseña del usuario' })
  @IsNotEmpty()
  @IsString()
  password: string;
}
