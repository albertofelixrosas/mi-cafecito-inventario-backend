// src/permissions/dto/create-permission.dto.ts
import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreatePermissionDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(64)
  resource: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(32)
  action: string;
}
