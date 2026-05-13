import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import type { StringValue } from 'ms';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.services';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [
    ConfigModule,
    UsersModule,

    JwtModule.registerAsync({
      imports: [ConfigModule],

      inject: [ConfigService],

      useFactory: (configService: ConfigService) => {
        const tokenExpiration = configService.getOrThrow<string>('TOKEN_EXPIRATION');
        const expiresIn: number | StringValue = /^[0-9]+$/.test(tokenExpiration)
          ? Number(tokenExpiration)
          : (tokenExpiration as StringValue);

        return {
          secret: configService.getOrThrow<string>('JWT_SECRET'),

          signOptions: {
            expiresIn,
          },
        };
      },
    }),
  ],

  controllers: [AuthController],

  providers: [AuthService],

  exports: [AuthService],
})
export class AuthModule {}