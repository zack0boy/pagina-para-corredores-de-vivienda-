import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cliente } from './users.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Cliente])],
  controllers: [UsersController],
  providers: [UsersService]
})
export class UsersModule {}
