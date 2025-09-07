import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  async create(dto: CreateUserDto): Promise<User> {
    const hashedPassword = await bcrypt.hash(dto.password, 10);

    const user = this.usersRepository.create({
      ...dto,
      passwordHash: hashedPassword,
    });
    return this.usersRepository.save(user);
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
      relations: ['roles', 'userPermissions'],
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
