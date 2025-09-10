import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';
import { RolePermissions } from 'src/auth/role-permissions.map';
import { UserPermission } from 'src/user-permissions/entities/user-permission.entity';
import { Permission } from 'src/permissions/entities/permission.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    @InjectRepository(UserPermission)
    private readonly userPermissionsRepo: Repository<UserPermission>,
    @InjectRepository(Permission)
    private readonly permissionsRepo: Repository<Permission>,
  ) {}

  async create(dto: CreateUserDto): Promise<User> {
    const hashedPassword = await bcrypt.hash(dto.password, 10);

    const user = this.usersRepository.create({
      ...dto,
      passwordHash: hashedPassword,
    });
    const savedUser = await this.usersRepository.save(user);

    const basePermissions = RolePermissions[savedUser.role];

    for (const perm of basePermissions) {
      // Buscar el permiso en la tabla "permissions"
      const dbPermission = await this.permissionsRepo.findOne({
        where: { resource: perm.resource, action: perm.action },
      });

      if (dbPermission) {
        const userPerm = this.userPermissionsRepo.create({
          user: savedUser,
          permission: dbPermission,
          allowed: true, // por defecto los que vienen del rol están permitidos
        });

        await this.userPermissionsRepo.save(userPerm);
      }
    }

    return savedUser;
  }

  async findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  async findOne(id: number): Promise<User> {
    const user = await this.usersRepository.findOneBy({ userId: id });
    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    return user;
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.usersRepository
      .find({ where: { email } })
      .then(users => users[0] || null);
  }

  async findByUsername(username: string): Promise<User | null> {
    return this.usersRepository
      .find({ where: { username } })
      .then(users => users[0] || null);
  }

  async findByPhone(phone: string): Promise<User | null> {
    return this.usersRepository
      .find({ where: { phone } })
      .then(users => users[0] || null);
  }

  findByUsernameOrEmailOrPhone(identifier: string): Promise<User | null> {
    return this.usersRepository.findOne({
      where: [
        { username: identifier },
        { email: identifier.toLowerCase() }, // Normalizar email
        { phone: identifier },
      ],
      // Cargar relaciones si es necesario
      relations: ['userPermissions'],
    });
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.findOne(id);
    Object.assign(user, updateUserDto);
    return this.usersRepository.save(user);
  }

  async remove(id: number): Promise<void> {
    const user = await this.findOne(id);
    await this.usersRepository.remove(user);
  }
}
