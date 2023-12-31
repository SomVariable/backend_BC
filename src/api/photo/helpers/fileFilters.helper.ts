import sharp from 'sharp';
import { IMAGE_FILE_FORMAT } from '../constants/photo.constants';

export const imageFileFilter = async (
  req: any,
  file: Express.Multer.File,
  callback,
) => {
  if (!file.originalname.match(IMAGE_FILE_FORMAT)) {
    req.isPhoto = false;
    callback(null, false);
  }

  try {
    await sharp(file.buffer).metadata();
    callback(null, true);
  } catch (error) {
    req.isPhoto = false;
    callback(null, false);
  }
};
