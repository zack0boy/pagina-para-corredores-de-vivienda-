import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Usuario } from './entitys/usuario.entity';
import { Corredor } from './entitys/corredor.entity';
import { UsersGoogle } from './entitys/users_google.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Usuario,UsersGoogle,Corredor])],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService], 
})
export class UsersModule {}
