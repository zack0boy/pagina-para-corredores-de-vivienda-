import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule, getRepositoryToken } from '@nestjs/typeorm';
import { google } from 'googleapis';

import { UsersGoogle } from '../users/entities/users_google.entity';
import { GoogleCalendarService } from './google-calendar.service';

export const GOOGLE_OAUTH_CLIENT = 'GOOGLE_OAUTH_CLIENT';

@Module({
  imports: [ConfigModule, TypeOrmModule.forFeature([UsersGoogle])],
  providers: [
    {
      provide: GOOGLE_OAUTH_CLIENT,
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        return new google.auth.OAuth2(
          configService.getOrThrow<string>('GOOGLE_CLIENT_ID'),
          configService.getOrThrow<string>('GOOGLE_CLIENT_SECRET'),
          configService.get<string>('GOOGLE_REDIRECT_URI'),
        );
      },
    },
    {
      provide: GoogleCalendarService,
      inject: [getRepositoryToken(UsersGoogle), GOOGLE_OAUTH_CLIENT],
      useFactory: (usersGoogleRepository: any, oauth2Client: any) => {
        return new GoogleCalendarService(usersGoogleRepository, oauth2Client);
      },
    },
  ],
  exports: [GoogleCalendarService],
})
export class GoogleCalendarModule {}