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
    const user = await this.userRepository.findOne({ where: { username } });
    if (!user) throw new UnauthorizedException();

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new UnauthorizedException();

    let { name, email, role } = user;
    return { name, email, role,
      createdAt: new Date(),
      expiredAt: new Date(new Date().getTime() + (+process.env.JWT_EXPIRED_IN * 1000)), 
      accessToken: await this.jwtService.signAsync({ sub: user.id, username: user.username }) 
    };
  }


}