import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { v2 as cloudinary } from 'cloudinary';

import { CloudinaryService } from './cloudinary.service';
import { CloudinaryController } from './cloudinary.controller';

export const CLOUDINARY = 'CLOUDINARY';

@Module({
  imports: [ConfigModule],
  providers: [
    {
      provide: CLOUDINARY,
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        cloudinary.config({
          cloud_name: configService.getOrThrow<string>('CLOUDINARY_CLOUD_NAME'),
          api_key: configService.getOrThrow<string>('CLOUDINARY_API_KEY'),
          api_secret: configService.getOrThrow<string>('CLOUDINARY_API_SECRET'),
          secure: true,
        });

        return cloudinary;
      },
    },
    {
      provide: CloudinaryService,
      inject: [CLOUDINARY],
      useFactory: (cloudinaryClient: typeof cloudinary) => {
        return new CloudinaryService(cloudinaryClient);
      },
    },
  ],
  exports: [CloudinaryService],
  controllers: [CloudinaryController],
})
export class CloudinaryModule {}