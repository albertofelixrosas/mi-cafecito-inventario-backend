import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @ApiPropertyOptional({
    example: 'Luis',
    description: 'Token hasheado para el refresh',
  })
  @IsString()
  @IsNotEmpty()
  hashedRefreshToken?: string;
}
