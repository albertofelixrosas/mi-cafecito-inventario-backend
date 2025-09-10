// user-permissions.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { UserPermission } from './entities/user-permission.entity';
import { CreateUserPermissionDto } from './dto/create-user-permission.dto';
import { UpdateUserPermissionDto } from './dto/update-user-permission.dto';

@Injectable()
export class UserPermissionsService {
  constructor(
    @InjectRepository(UserPermission)
    private readonly userPermissionRepository: Repository<UserPermission>,
  ) {}

  // CREATE - Crear un nuevo permiso de usuario
  async create(
    createUserPermissionDto: CreateUserPermissionDto,
  ): Promise<UserPermission> {
    const userPermission = this.userPermissionRepository.create(
      createUserPermissionDto,
    );
    return await this.userPermissionRepository.save(userPermission);
  }

  // READ - Obtener todos los permisos de usuario
  async findAll(): Promise<UserPermission[]> {
    return await this.userPermissionRepository.find({
      relations: ['user', 'permission'],
    });
  }

  // READ - Obtener un permiso de usuario por ID
  async findOne(id: number): Promise<UserPermission> {
    const userPermission = await this.userPermissionRepository.findOne({
      where: { userPermissionId: id },
      relations: ['user', 'permission'],
    });

    if (!userPermission) {
      throw new NotFoundException(`UserPermission with ID ${id} not found`);
    }

    return userPermission;
  }

  // READ - Obtener permisos por usuario
  async findByUserId(userId: number): Promise<UserPermission[]> {
    return await this.userPermissionRepository.find({
      where: { userId },
      relations: ['permission'],
    });
  }

  // READ - Obtener permisos por permiso específico
  async findByPermissionId(permissionId: number): Promise<UserPermission[]> {
    return await this.userPermissionRepository.find({
      where: { permissionId },
      relations: ['user'],
    });
  }

  // READ - Verificar si un usuario tiene un permiso específico
  async checkUserPermission(
    userId: number,
    permissionId: number,
  ): Promise<boolean> {
    const userPermission = await this.userPermissionRepository.findOne({
      where: { userId, permissionId },
    });

    return userPermission ? userPermission.allowed : false;
  }

  // UPDATE - Actualizar un permiso de usuario
  async update(
    id: number,
    updateUserPermissionDto: UpdateUserPermissionDto,
  ): Promise<UserPermission> {
    const userPermission = await this.findOne(id);

    Object.assign(userPermission, updateUserPermissionDto);

    return await this.userPermissionRepository.save(userPermission);
  }

  // UPDATE - Actualizar el estado 'allowed' de un permiso
  async updatePermissionStatus(
    id: number,
    allowed: boolean,
  ): Promise<UserPermission> {
    const userPermission = await this.findOne(id);
    userPermission.allowed = allowed;

    return await this.userPermissionRepository.save(userPermission);
  }

  // DELETE - Eliminar un permiso de usuario
  async remove(id: number): Promise<void> {
    const userPermission = await this.findOne(id);
    await this.userPermissionRepository.remove(userPermission);
  }

  // DELETE - Eliminar múltiples permisos de usuario
  async removeMultiple(ids: number[]): Promise<void> {
    const userPermissions = await this.userPermissionRepository.find({
      where: { userPermissionId: In(ids) },
    });

    if (userPermissions.length === 0) {
      throw new NotFoundException(
        'No user permissions found with the provided IDs',
      );
    }

    await this.userPermissionRepository.remove(userPermissions);
  }
}
