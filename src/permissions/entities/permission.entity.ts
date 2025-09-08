import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Unique,
  OneToMany,
} from 'typeorm';
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

  @OneToMany(() => UserPermission, up => up.permission)
  userPermissions: UserPermission[];
}
