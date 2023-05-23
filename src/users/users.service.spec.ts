import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { randomStringGenerator } from '@nestjs/common/utils/random-string-generator.util';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { ConfigModule } from '@nestjs/config';
import * as path from 'path';

describe('UsersService', () => {
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({ isGlobal: true }),
        TypeOrmModule.forRoot({
          type: 'postgres',
          host: process.env.PG_HOST,
          port: +process.env.PG_PORT,
          database: process.env.PG_DATABASE,
          username: process.env.PG_USERNAME,
          password: process.env.PG_PASSWORD,
          entities: [path.join(__dirname, '**', '*.entity.{ts,js}')],
          migrations: [path.join(__dirname, '**', '*.migration.{ts,js}')],
          synchronize: true,
        }),
        TypeOrmModule.forFeature([User]),
      ],
      providers: [UsersService],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('register user', async () => {
    const dto = new CreateUserDto();
    dto.email = 'example@gmail.com';
    dto.password = randomStringGenerator();
    await service.createUser(dto);
  });
});
