// src/seed/seed.service.ts
import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../users/entities/user.entity';
import { UserPermission } from '../user-permissions/entities/user-permission.entity';
import { RolePermissions } from '../auth/role-permissions.map';
import { PermissionsService } from '../permissions/permissions.service';

@Injectable()
export class SeedService {
  private readonly logger = new Logger(SeedService.name);

  constructor(
    private readonly permissionsService: PermissionsService,

    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
    @InjectRepository(UserPermission)
    private readonly userPermissionRepo: Repository<UserPermission>,
  ) {}

  async seedPermissions() {
    this.logger.log('🌱 Seeding permisos...');

    const allPermissions = Object.values(RolePermissions).flat();
    const uniqueCodes = new Set(
      allPermissions.map(p => `${p.resource}.${p.action}`),
    );

    for (const code of uniqueCodes) {
      const [resource, action] = code.split('.');

      try {
        await this.permissionsService.create({ resource, action });
        this.logger.log(`✅ Insertado permiso: ${code}`);
      } catch (err) {
        if (err instanceof Error) {
          if (err.message.includes('ya existe')) {
            this.logger.debug(`⚠️ Permiso ya existente: ${code}`);
          } else {
            this.logger.error(`❌ Error creando permiso ${code}`, err.stack);
          }
        }
      }
    }
  }

  async seedUserPermissions() {
    this.logger.log('🌱 Seeding user_permissions por rol...');

    const users = await this.userRepo.find({ relations: ['userPermissions'] });
    const allPermissions = await this.permissionsService.findAll();

    for (const user of users) {
      const rolePerms = RolePermissions[user.role];
      if (!rolePerms) continue;

      const userCodes = new Set(
        (user.userPermissions || []).map(up => up.permission.code),
      );

      for (const { resource, action } of rolePerms) {
        const code = `${resource}.${action}`;
        if (userCodes.has(code)) continue;

        const perm = allPermissions.find(p => p.code === code);
        if (!perm) continue;

        await this.userPermissionRepo.save(
          this.userPermissionRepo.create({
            user,
            permission: perm,
            allowed: true,
          }),
        );
        this.logger.log(
          `🔗 Asignado ${code} al usuario ${user.username} (${user.role})`,
        );
      }
    }
  }

  async runAll() {
    await this.seedPermissions();
    await this.seedUserPermissions();
  }
}
