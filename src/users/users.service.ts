import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {

  constructor(@InjectRepository(User) private usersRepository: Repository<User>) { }

  async findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  async findOne(id: number): Promise<User | null> {
    return this.usersRepository.findOneBy({ id });
  }

  async create(user: User): Promise<User> {
    const password = await bcrypt.hash(user.password, 10);
    return this.usersRepository.save({ ...user, password });
  }

  async update(id: number, user: User): Promise<User> {
    const password = await bcrypt.hash(user.password, 10);
    await this.usersRepository.update(+id, {...user, password})
    return this.usersRepository.findOneBy({ id });
  }

  async remove(id: number): Promise<void> {
    await this.usersRepository.delete(id);
  }

}
