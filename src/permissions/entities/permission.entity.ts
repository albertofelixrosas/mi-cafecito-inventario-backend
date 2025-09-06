import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Unique,
  ManyToMany,
  OneToMany,
} from 'typeorm';
import { Role } from '../../roles/entities/role.entity';
import { UserPermission } from '../../user-permissions/entities/user-permission.entity';

@Entity('permissions')
@Unique(['code'])
@Unique(['resource', 'action'])
export class Permission {
  @PrimaryGeneratedColumn()
  permissionId: number;

  @Column({ length: 64 })
  resource: string; // ej. "entradas", "salidas", "inventario"

  @Column({ length: 32 })
  action: string; // ej. "view", "create", "update"

  @Column({ length: 128 })
  code: string; // ej. "entradas.view"

  @ManyToMany(() => Role, role => role.permissions)
  roles: Role[];

  @OneToMany(() => UserPermission, up => up.permission)
  userPermissions: UserPermission[];
}
