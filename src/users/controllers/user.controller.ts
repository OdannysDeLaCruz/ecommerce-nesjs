import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { UserService } from '../services/user.service';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}
  @Get()
  getUser(): string {
    return this.userService.getApiKey()
  }

  @Get(':id/orders')
  getUserOrders(@Param('id', ParseIntPipe) userId: number): string {
    return this.userService.getUserOrders(userId);
  }
}
