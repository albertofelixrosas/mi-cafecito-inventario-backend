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
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, u => u.userPermissions, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  @Index()
  user: User;

  @ManyToOne(() => Permission, p => p.userPermissions, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'permission_id' })
  @Index()
  permission: Permission;

  @Column({ type: 'boolean' })
  allowed: boolean; // true = agrega/autoriza, false = quita/deniega
}
