import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { User } from '../entities/user.entity';

@Injectable()
export class UserService {
  constructor(@Inject('API_KEY') private apiKey: string) {}
  private autoIncrementalId = 1;
  private users: User[] = [
    {
      id: 1,
      name: 'John Doe',
      email: 'XXXXXXXXXXXXXXXX',
      password: '123456',
      role: 'admin',
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: null,
    },
  ];
  getApiKey() {
    return this.apiKey;
  }
  findOne(id: number) {
    const user = this.users.find((user) => user.id === id);
    if (!user) {
      throw new NotFoundException(`Usuario con ${id} no encontrado.`);
    }
  }

  getUserOrders(userId: number): string {
    return `Orders of user #${userId}`;
  }
}
