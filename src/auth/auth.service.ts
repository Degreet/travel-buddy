import {
  Injectable,
  NotAcceptableException,
  UnauthorizedException,
} from '@nestjs/common';

import { compare, hash } from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';

import { UsersService } from '../users/users.service';
import { User } from '../users/entities/user.entity';

import { LoginDto } from './dto/login.dto';
import { SignupDto } from './dto/signup.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async getJWT(user: User) {
    const payload = { email: user.email, id: user.id };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async login(loginDto: LoginDto) {
    const user = await this.usersService.findByEmail(loginDto.email);
    if (!user || !(await compare(loginDto.password, user.password)))
      throw new UnauthorizedException();
    return await this.getJWT(user);
  }

  async signup(signupDto: SignupDto) {
    let user = await this.usersService.findByEmail(signupDto.email);
    if (user) throw new NotAcceptableException('This email already taken');

    signupDto.password = await hash(signupDto.password, 11);
    user = await this.usersService.createUser(signupDto);

    return await this.getJWT(user);
  }
}
