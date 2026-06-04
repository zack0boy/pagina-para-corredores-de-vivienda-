import { Controller, Post, Get, Patch, Body, Param, UseGuards, ParseIntPipe } from '@nestjs/common';
import { TransactionService } from './services/transaction.service';
import { CreateReservaDto, CreateContratoDto, CreateCuotaDto, CreatePagoDto, UpdateCuotaEstadoDto } from './dto/create-transaction.dto';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { Roles, RolesGuard } from '../../common/guards/roles.guard';
import { RolUsuario } from '../../common/enums/estado.enum';

@Controller('transacciones')
export class TransactionController {
  constructor(private transactionService: TransactionService) {}

  // ========== RESERVAS ==========
  @Post('reservas')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(RolUsuario.CLIENTE)
  async createReserva(@Body() dto: CreateReservaDto) {
    return this.transactionService.createReserva(dto);
  }

  @Get('reservas/:id')
  @UseGuards(JwtAuthGuard)
  async getReserva(@Param('id', ParseIntPipe) id: number) {
    return this.transactionService.getReserva(id);
  }

  @Get('clientes/:idCliente/reservas')
  @UseGuards(JwtAuthGuard)
  async getReservasByCliente(@Param('idCliente', ParseIntPipe) idCliente: number) {
    return this.transactionService.getAllReservasByCliente(idCliente);
  }

  // ========== CONTRATOS ==========
  @Post('contratos')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(RolUsuario.CORREDOR, RolUsuario.ADMIN)
  async createContrato(@Body() dto: CreateContratoDto) {
    return this.transactionService.createContrato(dto);
  }

  @Get('contratos/:id')
  @UseGuards(JwtAuthGuard)
  async getContrato(@Param('id', ParseIntPipe) id: number) {
    return this.transactionService.getContrato(id);
  }

  // ========== CUOTAS ==========
  @Post('cuotas')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(RolUsuario.CORREDOR, RolUsuario.ADMIN)
  async createCuota(@Body() dto: CreateCuotaDto) {
    return this.transactionService.createCuota(dto);
  }

  @Get('cuotas/:id')
  @UseGuards(JwtAuthGuard)
  async getCuota(@Param('id', ParseIntPipe) id: number) {
    return this.transactionService.getCuota(id);
  }

  @Get('contratos/:idContrato/cuotas')
  @UseGuards(JwtAuthGuard)
  async getCuotasByContrato(@Param('idContrato', ParseIntPipe) idContrato: number) {
    return this.transactionService.getAllCuotasByContrato(idContrato);
  }

  @Patch('cuotas/:id/estado')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(RolUsuario.CORREDOR, RolUsuario.ADMIN)
  async updateCuotaEstado(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateCuotaEstadoDto) {
    return this.transactionService.updateCuotaEstado(id, dto);
  }

  // ========== PAGOS ==========
  @Post('pagos')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(RolUsuario.CLIENTE)
  async createPago(@Body() dto: CreatePagoDto) {
    return this.transactionService.createPago(dto);
  }

  @Get('pagos/:id')
  @UseGuards(JwtAuthGuard)
  async getPago(@Param('id', ParseIntPipe) id: number) {
    return this.transactionService.getPago(id);
  }

  @Get('clientes/:idCliente/pagos')
  @UseGuards(JwtAuthGuard)
  async getPagosByCliente(@Param('idCliente', ParseIntPipe) idCliente: number) {
    return this.transactionService.getAllPagosByCliente(idCliente);
  }
}
