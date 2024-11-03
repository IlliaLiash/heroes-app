import { applyDecorators, UseInterceptors } from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname, resolve } from 'path';
import { BadRequestException } from '@nestjs/common';
import * as fs from 'fs';

export function UploadImages(maxCount: number = 10) {
  const uploadPath = resolve(__dirname, '..', '..', 'uploads');

  if (!fs.existsSync(uploadPath)) {
    fs.mkdirSync(uploadPath, { recursive: true });
    console.log(`Created uploads directory at: ${uploadPath}`);
  }

  return applyDecorators(
    UseInterceptors(
      FilesInterceptor('images', maxCount, {
        storage: diskStorage({
          destination: uploadPath,
          filename: (req, file, cb) => {
            const uniqueSuffix = `${Date.now()}-${Math.round(
              Math.random() * 1e9,
            )}`;
            const ext = extname(file.originalname);
            cb(null, `images-${uniqueSuffix}${ext}`);
          },
        }),
        fileFilter: (req, file, cb) => {
          if (!file.mimetype.match(/\/(jpg|jpeg|png|gif)$/)) {
            cb(new BadRequestException('Only image files are allowed!'), false);
          } else {
            cb(null, true);
          }
        },
        limits: { fileSize: 5 * 1024 * 1024 },
      }),
    ),
  );
}
