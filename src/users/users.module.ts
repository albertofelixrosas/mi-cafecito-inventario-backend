import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { User } from './entities/user.entity';
import { Permission } from 'src/permissions/entities/permission.entity';
import { UserPermission } from 'src/user-permissions/entities/user-permission.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Permission, UserPermission])],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService], // importante si luego lo usas en otras entidades
})
export class UsersModule {}
