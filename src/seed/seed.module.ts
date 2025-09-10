// src/seed/seed.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../users/entities/user.entity';
import { UserPermission } from '../user-permissions/entities/user-permission.entity';
import { SeedService } from './seed.service';
import { PermissionsModule } from '../permissions/permissions.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, UserPermission]),
    PermissionsModule, // ✅ aquí
  ],
  providers: [SeedService],
  exports: [SeedService],
})
export class SeedModule {}
