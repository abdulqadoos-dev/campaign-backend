import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {

  constructor(private jwtService: JwtService, @InjectRepository(User) private userRepository: Repository<User>) { }

  async autenticate(username: string, password: string) {

    const user = await this.userRepository.findOneBy({ username });
    if (!user) throw new UnauthorizedException();
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new UnauthorizedException();
    return { access_token: await this.jwtService.signAsync({ sub: user.id, username: user.username }) };
  }


}