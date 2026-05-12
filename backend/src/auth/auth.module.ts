import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from '../users/users.module';
import { AuthController } from '../auth/auth.controller';
import { GoogleStrategy } from '../auth/google.strategy';
import { JwtStrategy } from '../auth/auth.jwtStrategy';
import { AuthService } from './auth.services';

@Module({
  imports: [

    ConfigModule.forRoot({
      isGlobal: true,
    }),

    UsersModule,

    PassportModule.register({
      defaultStrategy: 'jwt',
    }),

    JwtModule.register({

      secret: process.env.JWTKEY,

      signOptions: {
      expiresIn: '1d',
      },
    }),
  ],

  controllers: [
    AuthController,
    AuthController,
  ],

  providers: [
    AuthService,
    GoogleStrategy,
    JwtStrategy,
  ],

  exports: [
    JwtModule,
    PassportModule,
  ],
})
export class AuthModule {}