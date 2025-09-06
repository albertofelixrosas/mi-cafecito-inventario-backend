import { Role } from 'src/roles/entities/role.entity';
import { StockEntry } from 'src/stock-entries/entities/stock-entry.entity';
import { StockLoss } from 'src/stock-losses/entities/stock-loss.entity';
import { StockWithdrawal } from 'src/stock-withdrawals/entities/stock-withdrawal.entity';
import { UserPermission } from 'src/user-permissions/entities/user-permission.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  ManyToMany,
  JoinTable,
} from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn({ type: 'int', name: 'user_id' })
  userId: number;

  @Column({ type: 'varchar', length: 100 })
  name: string;

  @Column({ type: 'varchar', length: 100 })
  lastname: string;

  @Column({ type: 'varchar', length: 150, unique: true })
  email: string;

  @Column({ type: 'varchar', length: 255 })
  passwordHash: string;

  @Column({ type: 'varchar', length: 50 })
  role: string; // Más adelante puedes cambiarlo a ENUM

  @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp', name: 'updated_at' })
  updatedAt: Date;

  // 🔗 Relaciones inversas
  @OneToMany(() => StockEntry, entry => entry.user)
  entries: StockEntry[];

  @OneToMany(() => StockWithdrawal, withdrawal => withdrawal.user)
  withdrawals: StockWithdrawal[];

  @OneToMany(() => StockLoss, loss => loss.user)
  losses: StockLoss[];

  @ManyToMany(() => Role, role => role.users, { cascade: false })
  @JoinTable({
    name: 'user_roles',
    joinColumn: { name: 'user_id', referencedColumnName: 'userId' },
    inverseJoinColumn: { name: 'role_id', referencedColumnName: 'roleId' },
  })
  roles: Role[];

  @OneToMany(() => UserPermission, up => up.user, { cascade: true })
  userPermissions: UserPermission[];
}
