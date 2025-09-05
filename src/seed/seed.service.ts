// src/seed/seed.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Permission } from '../permissions/entities/permission.entity';
import { Role } from '../roles/entities/role.entity';

@Injectable()
export class SeedService {
  constructor(
    @InjectRepository(Permission) private permRepo: Repository<Permission>,
    @InjectRepository(Role) private roleRepo: Repository<Role>,
  ) {}

  async run() {
    const base = [
      { resource: 'entradas', action: 'view' },
      { resource: 'entradas', action: 'create' },
      { resource: 'entradas', action: 'update' },
      { resource: 'salidas', action: 'view' },
      { resource: 'salidas', action: 'create' },
      { resource: 'salidas', action: 'update' },
      { resource: 'inventario', action: 'view' },
    ];

    const perms = await this.permRepo.save(
      base.map(b => ({ ...b, code: `${b.resource}.${b.action}` })),
    );

    const byCode = (codes: string[]) =>
      perms.filter(p => codes.includes(p.code));

    const admin = this.roleRepo.create({
      name: 'ADMIN',
      permissions: perms, // todo
    });

    const gerente = this.roleRepo.create({
      name: 'GERENTE',
      permissions: byCode([
        'entradas.view',
        'entradas.create',
        'salidas.view',
        'salidas.create',
        'inventario.view',
      ]),
    });

    const empleado = this.roleRepo.create({
      name: 'EMPLEADO',
      permissions: byCode(['salidas.create', 'inventario.view']),
    });

    await this.roleRepo.save([admin, gerente, empleado]);
  }
}
