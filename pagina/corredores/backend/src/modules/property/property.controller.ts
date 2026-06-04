import { Controller, Post, Get, Patch, Delete, Body, Param, UseGuards, Query, UseInterceptors, UploadedFile, ParseIntPipe } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { PropertyService } from './services/property.service';
import { CreatePropiedadDto, UpdatePropiedadDto, BuscarPropiedadesDto } from './dto/create-propiedad.dto';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { Roles, RolesGuard } from '../../common/guards/roles.guard';
import { RolUsuario } from '../../common/enums/estado.enum';

@Controller('propiedades')
export class PropertyController {
  constructor(private propertyService: PropertyService) {}

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(RolUsuario.CORREDOR, RolUsuario.ADMIN)
  async create(@Body() dto: CreatePropiedadDto) {
    return this.propertyService.create(dto);
  }

  @Get()
  async findAll(@Query() filters: BuscarPropiedadesDto) {
    return this.propertyService.findAll(filters);
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return this.propertyService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(RolUsuario.CORREDOR, RolUsuario.ADMIN)
  async update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdatePropiedadDto) {
    return this.propertyService.update(id, dto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(RolUsuario.CORREDOR, RolUsuario.ADMIN)
  async remove(@Param('id', ParseIntPipe) id: number) {
    await this.propertyService.remove(id);
    return { message: 'Propiedad eliminada correctamente' };
  }

  // ========== IMÁGENES ==========
  @Post(':id/imagenes')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(RolUsuario.CORREDOR, RolUsuario.ADMIN)
  @UseInterceptors(FileInterceptor('file'))
  async uploadImage(
    @Param('id', ParseIntPipe) id: number,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.propertyService.uploadImage(id, file);
  }

  @Patch('imagenes/:idImagen/principal')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(RolUsuario.CORREDOR, RolUsuario.ADMIN)
  async setMainImage(@Param('idImagen', ParseIntPipe) idImagen: number) {
    return this.propertyService.setMainImage(idImagen);
  }

  @Delete('imagenes/:idImagen')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(RolUsuario.CORREDOR, RolUsuario.ADMIN)
  async deleteImage(@Param('idImagen', ParseIntPipe) idImagen: number) {
    await this.propertyService.deleteImage(idImagen);
    return { message: 'Imagen eliminada correctamente' };
  }
}
