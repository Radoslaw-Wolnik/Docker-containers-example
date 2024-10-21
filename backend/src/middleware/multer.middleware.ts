// src/middleware/multer.config.ts

import multer from 'multer';
import path from 'path';
import { BadRequestError } from '../utils/custom-errors.util';
import environment from '../config/environment';

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (file.fieldname === 'profilePicture') {
      cb(null, path.join(environment.UPLOAD_PATH, 'profile-pictures'));
    } else if (file.fieldname === 'blogImage') {
      cb(null, path.join(environment.UPLOAD_PATH, 'blog-images'));
    } else {
      cb(new BadRequestError('Invalid field name for file upload'), '');
    }
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const fileFilter = (req: any, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new BadRequestError('Only image files are allowed'));
  }
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB limit
  }
});

export default upload;