import { StockEntry } from 'src/stock-entries/entities/stock-entry.entity';
import { StockLoss } from 'src/stock-losses/entities/stock-loss.entity';
import { StockWithdrawal } from 'src/stock-withdrawals/entities/stock-withdrawal.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn({ type: 'int', name: 'user_id' })
  userId: number;

  @Column({ type: 'varchar', length: 100 })
  name: string;

  @Column({ type: 'varchar', length: 100 })
  lastname: string;

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
}
