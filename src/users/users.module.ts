import { Module } from '@nestjs/common';
import { UserService } from './services/user.service';
import { UserController } from './controllers/user.controller';

@Module({
  controllers: [UserController],
  providers: [
    UserService,
    {
      provide: "API_KEY",
      useValue: "123456"
    }
  ]
})
export class UsersModule {}
