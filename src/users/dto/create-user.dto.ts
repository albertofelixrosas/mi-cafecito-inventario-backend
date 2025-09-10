import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsString, MaxLength } from 'class-validator';
import { UserRole } from '../../shared/enums/user-role.enum';

export class CreateUserDto {
  @ApiProperty({ example: 'Luis', description: 'Nombres' })
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  name: string;

  @ApiProperty({ example: 'Erro', description: 'Apellidos' })
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  lastname: string;

  @ApiProperty({ example: 'luis123', description: 'Nombre de usuario' })
  @IsString()
  @IsNotEmpty()
  @MaxLength(20)
  username: string;

  @ApiProperty({ example: '6421910021', description: 'Número de contacto' })
  @IsString()
  @MaxLength(15)
  phone?: string;

  @ApiProperty({
    example: 'email@domain.com',
    description: 'Correco electrónico',
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(150)
  email?: string;

  @ApiProperty({
    enum: UserRole,
    default: UserRole.CHEF,
    description: 'Rol del empleado',
  })
  @IsEnum(UserRole)
  role: UserRole;

  @ApiProperty({ example: 'strongPassword123', description: 'Password' })
  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  password: string;
}
