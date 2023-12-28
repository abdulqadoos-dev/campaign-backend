import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { Public } from 'src/auth/constants';
import { User } from 'src/entities/user.entity';

@Public()
@Controller('users')
export class UsersController {

  constructor(private userService: UsersService) { }

  @Post()
  async create(@Body() user: User) {
    return this.userService.create(user);
  }

  @Get()
  async findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: Number) {
    return this.userService.findOne(+id);
  }

  @Patch(':id')
  async update(@Param('id') id: Number, @Body() user: User) {
    return this.userService.update(+id, user);
  }

}
