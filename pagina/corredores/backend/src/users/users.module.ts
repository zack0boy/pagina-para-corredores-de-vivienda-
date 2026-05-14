import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersGoogle, Usuario } from './users.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Usuario,UsersGoogle])],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService], 
})
export class UsersModule {}
