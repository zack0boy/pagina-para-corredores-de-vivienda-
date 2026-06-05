import {Controller,Get,Post,Body,Patch,Param,Delete,Request,UseGuards,} from '@nestjs/common';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { ReservasService } from './reservas.service';
import { CreateReservaDto } from './dto/create-reserva.dto';
import { UpdateReservaDto } from './dto/update-reserva.dto';

//POST    http://localhost:3000/reservas -- crear una nueva reserva (requiere autenticación)
//GET     http://localhost:3000/reservas -- obtener todas las reservas (requiere autenticación)
//GET     http://localhost:3000/reservas/:id -- obtener una reserva específica por su ID (requiere autenticación)
//PATCH   http://localhost:3000/reservas/:id -- actualizar una reserva específica por su ID (requiere autenticación)
//DELETE  http://localhost:3000/reservas/:id -- eliminar una reserva específica por su ID (requiere autenticación)

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