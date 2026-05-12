import { Controller,Get,Post,Body } from '@nestjs/common';
import { UsersService } from './users.service';
import { Usuario } from './users.entity';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

  @Get()
  findAll() {
    
    return this.usersService.findAll();
  }

  @Post('register')
  create(@Body() body: Partial<Usuario>) {
    return this.usersService.create(body);
  }
}
