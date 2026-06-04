import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PagosService } from './pagos.service';
import { CreatePagoDto } from './dto/create-pago.dto';
import { UpdatePagoDto } from './dto/update-pago.dto';

//POST   http://localhost:3000/pagos -- crear un nuevo pago
//GET    http://localhost:3000/pagos -- obtener todos los pagos
//GET    http://localhost:3000/pagos/1 -- obtener un pago por su ID
//PATCH  http://localhost:3000/pagos/1 -- actualizar un pago por su ID
//DELETE http://localhost:3000/pagos/1 -- eliminar un pago por su ID

@Controller('pagos')
export class PagosController {
  constructor(private readonly pagosService: PagosService) {}

  @Post()
  create(@Body() createPagoDto: CreatePagoDto) {
    return this.pagosService.create(createPagoDto);
  }

  @Get()
  findAll() {
    return this.pagosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.pagosService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePagoDto: UpdatePagoDto) {
    return this.pagosService.update(+id, updatePagoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.pagosService.remove(+id);
  }
}
