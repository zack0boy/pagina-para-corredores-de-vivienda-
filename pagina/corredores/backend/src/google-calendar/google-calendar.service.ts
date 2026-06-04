import { Inject, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OAuth2Client } from 'google-auth-library';
import { calendar_v3, google } from 'googleapis';
import { Repository } from 'typeorm';

import { UsersGoogle } from '../modules/user/entities/users-google.entity';
import { GOOGLE_OAUTH_CLIENT } from './google-calendar.module';

@Injectable()
export class GoogleCalendarService {
  constructor(
    @InjectRepository(UsersGoogle)
    private readonly usersGoogleRepository: Repository<UsersGoogle>,
    @Inject(GOOGLE_OAUTH_CLIENT)
    private readonly oauth2Client: OAuth2Client,
  ) {}

  async crearEventoCalendario(
    idUsuario: number,
    titulo: string,
    descripcion: string,
    fechaInicio: Date | string,
    fechaFin: Date | string,
  ): Promise<calendar_v3.Schema$Event> {
    const usuario = await this.usersGoogleRepository
      .createQueryBuilder('ug')
      .where('ug.idUsuario = :idUsuario', { idUsuario })
      .getOne();

    if (!usuario) {
      throw new NotFoundException('Usuario Google no encontrado');
    }

    if (!usuario.refreshToken) {
      throw new UnauthorizedException('El usuario no tiene refresh_token disponible');
    }

    await this.configurarCliente(usuario);

    try {
      return await this.insertarEvento(titulo, descripcion, fechaInicio, fechaFin);
    } catch (error) {
      await this.renovarToken(usuario);
      await this.configurarCliente(usuario);

      return this.insertarEvento(titulo, descripcion, fechaInicio, fechaFin);
    }
  }

  private async configurarCliente(usuario: UsersGoogle): Promise<void> {
    this.oauth2Client.setCredentials({
      access_token: usuario.accessToken ?? undefined,
      refresh_token: usuario.refreshToken ?? undefined,
      expiry_date: usuario.tokenExpiryDate ? usuario.tokenExpiryDate.getTime() : undefined,
    });
  }

  private async renovarToken(usuario: UsersGoogle): Promise<void> {
    this.oauth2Client.setCredentials({
      refresh_token: usuario.refreshToken ?? undefined,
    });

    const accessTokenResponse = await this.oauth2Client.getAccessToken();
    const accessToken = accessTokenResponse.token;

    if (!accessToken) {
      throw new UnauthorizedException('No se pudo renovar el access_token');
    }

    const newExpiryDate = this.oauth2Client.credentials.expiry_date
      ? new Date(this.oauth2Client.credentials.expiry_date)
      : undefined;

    // Actualizar por la llave primaria idGoogle
    await this.usersGoogleRepository
      .createQueryBuilder()
      .update(UsersGoogle)
      .set({
        accessToken,
        tokenExpiryDate: newExpiryDate,
      })
      .where('idGoogle = :idGoogle', { idGoogle: usuario.idGoogle })
      .execute();

    usuario.accessToken = accessToken;
    usuario.tokenExpiryDate = newExpiryDate;
  }

  private async insertarEvento(
    titulo: string,
    descripcion: string,
    fechaInicio: Date | string,
    fechaFin: Date | string,
  ): Promise<calendar_v3.Schema$Event> {
    const calendar = google.calendar({
      version: 'v3',
      auth: this.oauth2Client,
    });

    const response = await calendar.events.insert({
      calendarId: 'primary',
      requestBody: {
        summary: titulo,
        description: descripcion,
        start: {
          dateTime: new Date(fechaInicio).toISOString(),
          timeZone: 'UTC',
        },
        end: {
          dateTime: new Date(fechaFin).toISOString(),
          timeZone: 'UTC',
        },
      },
    });

    return response.data;
  }
}