import {Controller,Patch,Param,} from '@nestjs/common';
import { UsersService } from './users.service';

//PATCH   http://localhost:3000/users/:id/corredor
//PATCH   http://localhost:3000/users/:id/google/corredor

@Controller('users')
export class UsersController {

  constructor(
    private readonly usersService: UsersService,
  ) {}

  @Patch(':id/corredor')
  assignCorredor(
    @Param('id') id: string,
  ) {
    return this.usersService.assignCorredor(+id);
  }
  @Patch(':id/google/corredor')
  assignCorredorGoogle(
  @Param('id') id: string,
  ) {
    return this.usersService.assignCorredor(+id);
  }
}