// src/database/seeds/permissions.seeder.service.ts
import { Injectable, OnApplicationBootstrap, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Permission } from '../../permissions/entities/permission.entity';
import { Resource } from '../../shared/enums/resource.enum';
import { Action } from '../../shared/enums/action.enum';

@Injectable()
export class PermissionsSeederService implements OnApplicationBootstrap {
  private readonly logger = new Logger(PermissionsSeederService.name);

  constructor(
    @InjectRepository(Permission)
    private readonly permissionRepository: Repository<Permission>,
  ) {}

  async onApplicationBootstrap() {
    await this.seedPermissions();
  }

  async seedPermissions(): Promise<void> {
    try {
      this.logger.log('Starting permissions seeding...');

      const allPermissions = this.generateAllPermissions();
      const results = await this.createMissingPermissions(allPermissions);

      this.logger.log(
        `Permissions seeding completed. Created: ${results.created}, Skipped: ${results.skipped}, Total: ${results.total}`,
      );
    } catch (error) {
      this.logger.error('Error during permissions seeding:', error);
      throw error;
    }
  }

  private generateAllPermissions(): Array<{
    resource: string;
    action: string;
    code: string;
  }> {
    const permissions: Array<{
      resource: string;
      action: string;
      code: string;
    }> = [];

    for (const resource of Object.values(Resource)) {
      for (const action of Object.values(Action)) {
        permissions.push({
          resource,
          action,
          code: `${resource}:${action}`,
        });
      }
    }

    return permissions;
  }

  private async createMissingPermissions(
    permissions: Array<{ resource: string; action: string; code: string }>,
  ): Promise<{ created: number; skipped: number; total: number }> {
    let created = 0;
    let skipped = 0;

    for (const permissionData of permissions) {
      const existing = await this.permissionRepository.findOne({
        where: { code: permissionData.code },
      });

      if (!existing) {
        const permission = this.permissionRepository.create(permissionData);
        await this.permissionRepository.save(permission);
        created++;
        this.logger.debug(`Created permission: ${permissionData.code}`);
      } else {
        skipped++;
      }
    }

    return {
      created,
      skipped,
      total: permissions.length,
    };
  }

  // Métodos utilitarios
  async getPermissionByCode(code: string): Promise<Permission | null> {
    return this.permissionRepository.findOne({ where: { code } });
  }

  async getAllSeededPermissions(): Promise<Permission[]> {
    return this.permissionRepository.find();
  }
}
