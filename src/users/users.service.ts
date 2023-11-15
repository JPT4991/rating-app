import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Users, UsersDocument } from './schema/users.schema';
import { Model } from 'mongoose';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(Users.name) private usersModel: Model<UsersDocument>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<Partial<Users>> {
    const existingUser = await this.usersModel.findOne({
      $or: [
        { email: createUserDto.email },
        { username: createUserDto.username },
      ],
    });

    if (existingUser) {
      throw new ConflictException(
        'User with that email or username already exists',
      );
    }

    const createdUser = await this.usersModel.create(createUserDto);

    const { password, ...result } = createdUser.toObject();
    return result;
  }

  async findOneByUsername(username: string) {
    const existingUser = await this.usersModel.findOne({
      username: username,
    });
    if (!existingUser && username !== 'developer') {
      throw new NotFoundException('User not found');
    }
    return existingUser;
  }
}
