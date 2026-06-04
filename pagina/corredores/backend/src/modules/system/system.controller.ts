import { Controller, Post, Get, Patch, Delete, Body, Param, UseGuards, ParseIntPipe } from '@nestjs/common';
import { SystemService } from './services/system.service';
import { CreateConfiguracionDto, UpdateConfiguracionDto } from './dto/configuracion.dto';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { Roles, RolesGuard } from '../../common/guards/roles.guard';
import { RolUsuario } from '../../common/enums/estado.enum';

@Controller('sistema')
export class SystemController {
  constructor(private systemService: SystemService) {}

  // ========== CONFIGURACIONES ==========
  @Post('configuraciones')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(RolUsuario.ADMIN)
  async createConfiguracion(@Body() dto: CreateConfiguracionDto) {
    return this.systemService.createConfiguracion(dto);
  }

  @Get('configuraciones')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(RolUsuario.ADMIN)
  async getAllConfiguraciones() {
    return this.systemService.getAllConfiguraciones();
  }

  @Get('configuraciones/clave/:clave')
  async getConfiguracionByClave(@Param('clave') clave: string) {
    return this.systemService.getConfiguracion(clave);
  }

  @Get('configuraciones/:id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(RolUsuario.ADMIN)
  async getConfiguracionById(@Param('id', ParseIntPipe) id: number) {
    return this.systemService.getConfiguracionById(id);
  }

  @Patch('configuraciones/:id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(RolUsuario.ADMIN)
  async updateConfiguracion(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateConfiguracionDto) {
    return this.systemService.updateConfiguracion(id, dto);
  }

  @Patch('configuraciones/clave/:clave')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(RolUsuario.ADMIN)
  async updateConfiguracionByClave(@Param('clave') clave: string, @Body() dto: UpdateConfiguracionDto) {
    return this.systemService.updateConfiguracionByClave(clave, dto);
  }

  @Delete('configuraciones/:id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(RolUsuario.ADMIN)
  async deleteConfiguracion(@Param('id', ParseIntPipe) id: number) {
    await this.systemService.deleteConfiguracion(id);
    return { message: 'Configuración eliminada correctamente' };
  }
}
