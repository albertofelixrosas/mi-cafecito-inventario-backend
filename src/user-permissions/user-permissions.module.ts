// user-permissions.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserPermissionsService } from './user-permissions.service';
import { UserPermission } from './entities/user-permission.entity';
import { User } from '../users/entities/user.entity'; // Ajusta la ruta según tu estructura
import { Permission } from '../permissions/entities/permission.entity'; // Ajusta la ruta

@Module({
  imports: [TypeOrmModule.forFeature([UserPermission, User, Permission])],
  providers: [UserPermissionsService],
  exports: [UserPermissionsService],
})
export class UserPermissionsModule {}
