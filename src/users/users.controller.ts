import { Controller, Get,Post,Body } from '@nestjs/common';
import { UsersService } from './users.service';
import { Usuario } from './usuario.entity';
@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService) {}




}
