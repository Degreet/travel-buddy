import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) {}

  async findByEmail(email: string, loadTrips?: boolean) {
    return await this.usersRepository.findOne({
      where: { email },
      relations: { trips: loadTrips },
    });
  }

  async createUser(createUserDto: CreateUserDto) {
    return await this.usersRepository.save({
      email: createUserDto.email,
      password: createUserDto.password,
    });
  }
}
