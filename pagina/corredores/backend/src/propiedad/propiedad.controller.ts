import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { PropiedadService } from './propiedad.service';
import { CreatePropiedadDto } from './dto/create-propiedad.dto';
import { UpdatePropiedadDto } from './dto/update-propiedad.dto';

@Controller('propiedad')
//POST    http://localhost:3000/propiedad --crear una nueva propiedad  
//GET     http://localhost:3000/propiedad -- obtener todas las propiedades
//GET     http://localhost:3000/propiedad/:id -- obtener una propiedad específica por su ID
//PATCH   http://localhost:3000/propiedad/:id -- actualizar una propiedad específica por su ID
//DELETE  http://localhost:3000/propiedad/:id -- eliminar una propiedad específica por su ID
export class PropiedadController {
  constructor(private readonly propiedadService: PropiedadService) {}

  @Post(':id/imagen')
  @UseInterceptors(FileInterceptor('file'))
  uploadImage(
    @Param('id', ParseIntPipe) id: number,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.propiedadService.subirImagen(id, file);
  }

  @Post()
  create(@Body() createPropiedadDto: CreatePropiedadDto) {
    return this.propiedadService.create(createPropiedadDto);
  }

  @Get()
  findAll() {
    return this.propiedadService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.propiedadService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePropiedadDto: UpdatePropiedadDto) {
    return this.propiedadService.update(+id, updatePropiedadDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.propiedadService.remove(+id);
  }
}
