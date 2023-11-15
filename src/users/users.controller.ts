import { Body, Controller, Post, UseGuards, Request } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { Users } from './schema/users.schema';
import { IsDeveloperGuard } from 'src/auth/guards/developer.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Post()
  @UseGuards(IsDeveloperGuard)
  async create(@Body() createUserDto: CreateUserDto): Promise<Partial<Users>> {
    return await this.userService.create(createUserDto);
  }
}
