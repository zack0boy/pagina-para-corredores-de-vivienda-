    import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
    import { ContratosService } from './contratos.service';
    import { CreateContratoDto } from './dto/create-contrato.dto';
    import { UpdateContratoDto } from './dto/update-contrato.dto';

    //POST   http://localhost:3000/contratos -- crear un nuevo contrato
    //GET    http://localhost:3000/contratos -- obtener todos los contratos
    //GET    http://localhost:3000/contratos/1 -- obtener un contrato por su ID
    //PATCH  http://localhost:3000/contratos/1 -- actualizar un contrato por su ID
    //DELETE http://localhost:3000/contratos/1 -- eliminar un contrato por su ID
    
    @Controller('contratos')
    export class ContratosController {
      constructor(private readonly contratosService: ContratosService) {}

      @Post()
      create(@Body() createContratoDto: CreateContratoDto) {
        return this.contratosService.create(createContratoDto);
      }

      @Get()
      findAll() {
        return this.contratosService.findAll();
      }

      @Get(':id')
      findOne(@Param('id') id: string) {
        return this.contratosService.findOne(+id);
      }

      @Patch(':id')
      update(@Param('id') id: string, @Body() updateContratoDto: UpdateContratoDto) {
        return this.contratosService.update(+id, updateContratoDto);
      }

      @Delete(':id')
      remove(@Param('id') id: string) {
        return this.contratosService.remove(+id);
      }
    }
