import { Injectable, OnModuleInit } from '@nestjs/common';
import { UsersService } from '../users/users.service';

@Injectable()
export class SeedService implements OnModuleInit {
  constructor(private usersService: UsersService) {}

  async onModuleInit() {
    await this.createInitialUsers();
  }

  private async createInitialUsers() {
    const developerExists = await this.usersService.findOneByUsername(
      'developer',
    );
    if (!developerExists) {
      await this.usersService.create({
        email: 'example@example.com',
        username: 'developer',
        password: 'Developer123#',
        isDeveloper: true,
      });
    }
  }
}
