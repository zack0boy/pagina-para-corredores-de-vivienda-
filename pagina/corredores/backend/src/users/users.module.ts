import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Corredor } from './entities/corredor.entity';
import { UsersGoogle } from './entities/users_google.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UsersGoogle,Corredor])],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService], 
})
export class UsersModule {}
