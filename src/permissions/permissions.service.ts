// src/permissions/permissions.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Permission } from './entities/permission.entity';
import { CreatePermissionDto } from './dto/create-permission.dto';
import { UpdatePermissionDto } from './dto/update-permission.dto';

@Injectable()
export class PermissionsService {
  constructor(
    @InjectRepository(Permission)
    private readonly permissionRepo: Repository<Permission>,
  ) {}

  async create(createPermissionDto: CreatePermissionDto): Promise<Permission> {
    const { resource, action } = createPermissionDto;
    const code = `${resource}.${action}`;

    const exists = await this.permissionRepo.findOne({ where: { code } });
    if (exists) {
      throw new Error(`El permiso "${code}" ya existe`);
    }

    const permission = this.permissionRepo.create({
      ...createPermissionDto,
      code,
    });

    return this.permissionRepo.save(permission);
  }

  async findAll(): Promise<Permission[]> {
    return this.permissionRepo.find({
      order: { resource: 'ASC', action: 'ASC' },
    });
  }

  async findOne(id: number): Promise<Permission> {
    const permission = await this.permissionRepo.findOne({
      where: { permissionId: id },
    });
    if (!permission) {
      throw new NotFoundException(`Permiso con id ${id} no encontrado`);
    }
    return permission;
  }

  async update(
    id: number,
    updatePermissionDto: UpdatePermissionDto,
  ): Promise<Permission> {
    const permission = await this.findOne(id);

    Object.assign(permission, updatePermissionDto);

    // recalculamos el code si cambió resource o action
    if (updatePermissionDto.resource || updatePermissionDto.action) {
      permission.code = `${permission.resource}.${permission.action}`;
    }

    return this.permissionRepo.save(permission);
  }

  async remove(id: number): Promise<void> {
    const permission = await this.findOne(id);
    await this.permissionRepo.remove(permission);
  }
}
