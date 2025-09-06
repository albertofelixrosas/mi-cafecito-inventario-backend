import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  Unique,
  JoinColumn,
  Index,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Permission } from '../../permissions/entities/permission.entity';

@Entity('user_permissions')
@Unique(['user', 'permission'])
export class UserPermission {
  @PrimaryGeneratedColumn({ type: 'int', name: 'user_permission_id' })
  userPermissionId: number;

  @ManyToOne(() => User, u => u.userPermissions, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id', referencedColumnName: 'userId' })
  @Index()
  user: User;

  @ManyToOne(() => Permission, p => p.userPermissions, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'permission_id', referencedColumnName: 'permissionId' })
  @Index()
  permission: Permission;

  @Column({ type: 'boolean' })
  allowed: boolean; // true = agrega/autoriza, false = quita/deniega
}
