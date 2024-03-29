import multer from 'multer';
import { promises as fs } from 'fs';
import path from 'path';
import { randomUUID } from 'crypto';
import config from './config';

const imageStorage = multer.diskStorage({
  destination: async (req, file, callback) => {
    const destDir = path.join(config.publicPath, 'images');
    await fs.mkdir(destDir, {recursive: true});
    callback(null, config.publicPath);
  },
  filename: (req, file, callback) => {
    const extension = path.extname(file.originalname);
    const fileName = path.join('images', randomUUID() + extension);
    callback(null, fileName);
  }
});

export const imagesUpload = multer({storage: imageStorage});