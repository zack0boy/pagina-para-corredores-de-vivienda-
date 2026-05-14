import { Controller } from '@nestjs/common';
import { UsersService } from './users.service';
import { RolesGuard } from '../common/guard/roles.guard';
import { UseGuards } from '@nestjs/common';
import { Roles } from '../common/decorators/roles.decorators';
import { Role } from '../common/enums/roles.enum';
@Controller('users')
export class UsersController {}
    