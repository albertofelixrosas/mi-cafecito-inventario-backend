import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ example: 'Luis', description: 'First name of the user' })
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  name: string;

  @ApiProperty({ example: 'Erro', description: 'Last name of the user' })
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  lastname: string;

  @ApiProperty({ example: 'admin', description: 'Role of the user' })
  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  role: string;

  @ApiProperty({
    example: 'email@domain.com',
    description: 'Email of the user',
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(150)
  email: string;

  @ApiProperty({ example: 'strongPassword123', description: 'Password' })
  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  password: string;
}
