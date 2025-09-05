import { Module } from '@nestjs/common';
import { UserPermissionsService } from './user-permissions.service';

@Module({
  controllers: [],
  providers: [UserPermissionsService],
})
export class UserPermissionsModule {}
