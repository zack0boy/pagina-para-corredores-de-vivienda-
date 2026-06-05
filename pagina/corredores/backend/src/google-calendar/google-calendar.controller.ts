import { Body, Controller, Post } from '@nestjs/common';
import { GoogleCalendarService } from './google-calendar.service';

@Controller('google-calendar')
export class GoogleCalendarController {
  constructor(
    private readonly googleCalendarService: GoogleCalendarService,
  ) {}

  @Post('test')
  async crearEventoPrueba(
    @Body() body: {
      idUsuario: number;
      titulo: string;
      descripcion: string;
      fechaInicio: string;
      fechaFin: string;
    },
  ) {
    return this.googleCalendarService.crearEventoCalendario(
      body.idUsuario,
      body.titulo,
      body.descripcion,
      body.fechaInicio,
      body.fechaFin,
    );
  }
}