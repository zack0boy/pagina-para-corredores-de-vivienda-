import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CuotasService } from './cuotas.service';
import { CreateCuotaDto } from './dto/create-cuota.dto';
import { UpdateCuotaDto } from './dto/update-cuota.dto';

//POST   http://localhost:3000/cuotas -- crear una nueva cuota 
//GET    http://localhost:3000/cuotas -- obtener todas las cuotas
//GET    http://localhost:3000/cuotas/1 -- obtener una cuota específica
//PATCH  http://localhost:3000/cuotas/1 -- actualizar una cuota específica
//DELETE http://localhost:3000/cuotas/1 -- eliminar una cuota específica

@Controller('cuotas')
export class CuotasController {

  constructor(private readonly cuotasService: CuotasService) {}

  @Post()
  create(@Body() createCuotaDto: CreateCuotaDto) {
    return this.cuotasService.create(createCuotaDto);
  }

  @Get()
  findAll() {
    return this.cuotasService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.cuotasService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCuotaDto: UpdateCuotaDto) {
    return this.cuotasService.update(+id, updateCuotaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.cuotasService.remove(+id);
  }
}
