import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { v2 as cloudinary } from 'cloudinary';
import { Readable } from 'stream';

import { CLOUDINARY } from './cloudinary.module';

export interface CloudinaryUploadResult {
  secureUrl: string;
  publicId: string;
}

@Injectable()
export class CloudinaryService {
  constructor(
    @Inject(CLOUDINARY)
    private readonly cloudinaryClient: typeof cloudinary,
  ) {}

  uploadImage(file: Express.Multer.File, folder = 'propiedades'): Promise<CloudinaryUploadResult> {
    if (!file || !file.buffer) {
      throw new BadRequestException('Archivo de imagen inválido');
    }

    return new Promise<CloudinaryUploadResult>((resolve, reject) => {
      const upload = this.cloudinaryClient.uploader.upload_stream(
        {
          folder,
          resource_type: 'image',
        },
        (error, result) => {
            if (error) {
                console.error('CLOUDINARY ERROR:', error);

                reject(
                new BadRequestException(
                    JSON.stringify(error),
                ),
                );
                return;
            }

            if (!result) {
                reject(
                new BadRequestException(
                    'Cloudinary no retornó resultado',
                ),
                );
                return;
            }

          resolve({
            secureUrl: result.secure_url,
            publicId: result.public_id,
          });
        },
      );

      Readable.from(file.buffer).pipe(upload);
    });
  }
}