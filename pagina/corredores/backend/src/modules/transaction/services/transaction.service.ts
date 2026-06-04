import { Injectable, BadRequestException, NotFoundException, ConflictException, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Reserva } from '../entities/reserva.entity';
import { Contrato } from '../entities/contrato.entity';
import { Cuota } from '../entities/cuota.entity';
import { Pago } from '../entities/pago.entity';
import { Corredor } from '../../user/entities/corredor.entity';
import { UsersGoogle } from '../../user/entities/users-google.entity';
import { CreateReservaDto, CreateContratoDto, CreateCuotaDto, CreatePagoDto, UpdateCuotaEstadoDto } from '../dto/create-transaction.dto';
import { EstadoPropiedad, EstadoGeneral } from '../../../common/enums/estado.enum';
import { PropertyService } from '../../property/services/property.service';
import { GoogleCalendarService } from '../../../google-calendar/google-calendar.service';

@Injectable()
export class TransactionService {
  private readonly logger = new Logger(TransactionService.name);

  constructor(
    @InjectRepository(Reserva)
    private reservaRepository: Repository<Reserva>,
    @InjectRepository(Contrato)
    private contratoRepository: Repository<Contrato>,
    @InjectRepository(Cuota)
    private cuotaRepository: Repository<Cuota>,
    @InjectRepository(Pago)
    private pagoRepository: Repository<Pago>,
    @InjectRepository(Corredor)
    private corredorRepository: Repository<Corredor>,
    @InjectRepository(UsersGoogle)
    private usersGoogleRepository: Repository<UsersGoogle>,
    private propertyService: PropertyService,
    private googleCalendarService: GoogleCalendarService,
  ) {}

  // ========== RESERVAS ==========
  async createReserva(dto: CreateReservaDto): Promise<Reserva> {
    // Validar que la propiedad existe y está disponible
    const propiedad = await this.propertyService.findOne(dto.idPropiedad);
    if (propiedad.estado !== EstadoPropiedad.DISPONIBLE) {
      throw new ConflictException('La propiedad no está disponible para reservar');
    }

    // Validar que no existe reserva activa para esta propiedad
    const existingReserva = await this.reservaRepository.findOne({
      where: { idPropiedad: dto.idPropiedad, estado: EstadoGeneral.PENDIENTE },
    });

    if (existingReserva) {
      throw new ConflictException('Ya existe una reserva pendiente para esta propiedad');
    }

    const reserva = this.reservaRepository.create(dto);
    const savedReserva = await this.reservaRepository.save(reserva);

    // Integrar Google Calendar: crear evento en el calendario del corredor
    this.crearEventoCalendarioReserva(propiedad.idCorredor, savedReserva, propiedad).catch((error) => {
      this.logger.warn(`No se pudo crear evento en Google Calendar: ${error.message}`);
    });

    return savedReserva;
  }

  private async crearEventoCalendarioReserva(idCorredor: number, reserva: Reserva, propiedad: any): Promise<void> {
    try {
      // Obtener UsersGoogle del corredor
      const usersGoogle = await this.usersGoogleRepository.findOne({
        where: { idUsuario: idCorredor },
      });

      if (!usersGoogle || !usersGoogle.calendarEnabled) {
        this.logger.debug(`Corredor ${idCorredor} no tiene Google Calendar habilitado`);
        return;
      }

      // Crear evento de visita a la propiedad
      // La visita se programa para el día de la reserva a las 10:00 AM
      const fechaVisita = new Date(reserva.fechaReserva);
      fechaVisita.setHours(10, 0, 0, 0);

      const fechaVistaFin = new Date(fechaVisita);
      fechaVistaFin.setHours(11, 0, 0, 0);

      const titulo = `Visita - ${propiedad.titulo}`;
      const descripcion = `
Dirección: ${propiedad.direccion}
Precio: $${Number(propiedad.precio).toLocaleString('es-CL')}
Tipo: ${propiedad.tipoPropiedad}
Operación: ${propiedad.operacion}
Cliente: ID ${reserva.idCliente}
      `.trim();

      await this.googleCalendarService.crearEventoCalendario(
        idCorredor,
        titulo,
        descripcion,
        fechaVisita,
        fechaVistaFin,
      );

      this.logger.log(`Evento de Google Calendar creado para reserva ${reserva.idReserva}`);
    } catch (error) {
      this.logger.error(`Error al crear evento en Google Calendar: ${error.message}`);
      throw error;
    }
  }

  async getReserva(idReserva: number): Promise<Reserva> {
    const reserva = await this.reservaRepository.findOne({
      where: { idReserva },
      relations: ['propiedad', 'cliente', 'contrato'],
    });

    if (!reserva) {
      throw new NotFoundException('Reserva no encontrada');
    }

    return reserva;
  }

  async getAllReservasByCliente(idCliente: number): Promise<Reserva[]> {
    return this.reservaRepository.find({
      where: { idCliente },
      relations: ['propiedad', 'contrato'],
    });
  }

  // ========== CONTRATOS ==========
  async createContrato(dto: CreateContratoDto): Promise<Contrato> {
    // Validar reserva
    const reserva = await this.getReserva(dto.idReserva);
    if (reserva.estado !== EstadoGeneral.PENDIENTE) {
      throw new BadRequestException('La reserva debe estar en estado pendiente');
    }

    // Validar que no exista contrato previo
    const existingContrato = await this.contratoRepository.findOne({
      where: { idReserva: dto.idReserva },
    });

    if (existingContrato) {
      throw new ConflictException('Ya existe un contrato para esta reserva');
    }

    const contrato = this.contratoRepository.create(dto);
    const savedContrato = await this.contratoRepository.save(contrato);

    // Actualizar estado de reserva
    await this.reservaRepository.update(dto.idReserva, {
      estado: EstadoGeneral.ACTIVO,
    });

    return savedContrato;
  }

  async getContrato(idContrato: number): Promise<Contrato> {
    const contrato = await this.contratoRepository.findOne({
      where: { idContrato },
      relations: ['reserva', 'cuotas'],
    });

    if (!contrato) {
      throw new NotFoundException('Contrato no encontrado');
    }

    return contrato;
  }

  // ========== CUOTAS ==========
  async createCuota(dto: CreateCuotaDto): Promise<Cuota> {
    // Validar contrato
    const contrato = await this.getContrato(dto.idContrato);

    const cuota = this.cuotaRepository.create(dto);
    return this.cuotaRepository.save(cuota);
  }

  async getCuota(idCuota: number): Promise<Cuota> {
    const cuota = await this.cuotaRepository.findOne({
      where: { idCuota },
      relations: ['contrato', 'pagos'],
    });

    if (!cuota) {
      throw new NotFoundException('Cuota no encontrada');
    }

    return cuota;
  }

  async getAllCuotasByContrato(idContrato: number): Promise<Cuota[]> {
    return this.cuotaRepository.find({
      where: { idContrato },
      relations: ['pagos'],
      order: { numeroCuota: 'ASC' },
    });
  }

  async updateCuotaEstado(idCuota: number, dto: UpdateCuotaEstadoDto): Promise<Cuota> {
    const cuota = await this.getCuota(idCuota);
    Object.assign(cuota, dto);
    return this.cuotaRepository.save(cuota);
  }

  // ========== PAGOS ==========
  async createPago(dto: CreatePagoDto): Promise<Pago> {
    // Validar cuota
    const cuota = await this.getCuota(dto.idCuota);

    // Validar que el monto pagado no supere el esperado (con tolerancia)
    const totalPagado = cuota.pagos?.reduce((sum, p) => sum + Number(p.montoPagado), 0) || 0;
    if (totalPagado + Number(dto.montoPagado) > Number(cuota.montoEsperado) * 1.1) {
      throw new BadRequestException('El monto excede el esperado de la cuota');
    }

    const pago = this.pagoRepository.create(dto);
    const savedPago = await this.pagoRepository.save(pago);

    // Actualizar estado de cuota si está pagada
    const nuevoTotal = totalPagado + Number(dto.montoPagado);
    if (nuevoTotal >= Number(cuota.montoEsperado)) {
      await this.cuotaRepository.update(dto.idCuota, {
        estado: EstadoGeneral.ACTIVO,
      });
    }

    return savedPago;
  }

  async getPago(idPago: number): Promise<Pago> {
    const pago = await this.pagoRepository.findOne({
      where: { idPago },
      relations: ['cuota', 'cliente', 'usuarioReceptor'],
    });

    if (!pago) {
      throw new NotFoundException('Pago no encontrado');
    }

    return pago;
  }

  async getAllPagosByCliente(idCliente: number): Promise<Pago[]> {
    return this.pagoRepository.find({
      where: { idCliente },
      relations: ['cuota', 'usuarioReceptor'],
      order: { fechaPago: 'DESC' },
    });
  }
}
