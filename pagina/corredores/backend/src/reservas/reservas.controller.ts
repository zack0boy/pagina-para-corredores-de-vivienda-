import {Controller,Get,Post,Body,Patch,Param,Delete,Request,UseGuards,} from '@nestjs/common';
import { ReservasService } from './reservas.service';
import { CreateReservaDto } from './dto/create-reserva.dto';
import { UpdateReservaDto } from './dto/update-reserva.dto';
import { JwtAuthGuard } from '../common/guard/jwt.auth.guard';

//POST    http://localhost:3000/reservas
//GET     http://localhost:3000/reservas
//GET     http://localhost:3000/reservas/:id
//PATCH   http://localhost:3000/reservas/:id
//DELETE  http://localhost:3000/reservas/:id

@Controller('reservas')
export class ReservasController {

  constructor(
    private readonly reservasService: ReservasService,
  ) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  create(
    
    @Body() createReservaDto: CreateReservaDto,
    @Request() req,
  ) {

    return this.reservasService.create(
      createReservaDto,
      req.user.sub,
    );
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  findAll() {
    return this.reservasService.findAll();
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  findOne(
    @Param('id') id: string,
  ) {
    return this.reservasService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateReservaDto: UpdateReservaDto,
  ) {

    return this.reservasService.update(
      +id,
      updateReservaDto,
    );
  }

  @Delete(':id')
  remove(
    @Param('id') id: string,
  ) {

    return this.reservasService.remove(+id);
  }
}