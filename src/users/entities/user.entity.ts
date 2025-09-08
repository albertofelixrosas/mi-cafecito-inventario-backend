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
} from 'typeorm';
import { UserRole } from '../enums/user-role.enum';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn({ type: 'int', name: 'user_id' })
  userId: number;

  @Column({ type: 'varchar', length: 100 })
  name: string;

  @Column({ type: 'varchar', length: 100 })
  lastname: string;

  @Column({ type: 'varchar', length: 20, unique: true })
  username: string;

  @Column({ type: 'varchar', length: 150, nullable: true, unique: true })
  email?: string;

  @Column({ type: 'varchar', length: 15, nullable: true })
  phone?: string;

  @Column({ type: 'varchar', length: 255 })
  passwordHash: string;

  // 🔑 ÚNICO rol del usuario
  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.CHEF,
  })
  role: UserRole;

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

  @OneToMany(() => UserPermission, up => up.user, { cascade: true })
  userPermissions: UserPermission[];
}
