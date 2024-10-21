// src/middleware/upload.middleware.ts

import { Request, Response, NextFunction } from 'express';
import multer from 'multer';
import upload from './multer.middleware';
import { BadRequestError } from '../utils/custom-errors.util';

export const uploadProfilePicture = (req: Request, res: Response, next: NextFunction) => {
  upload.single('profilePicture')(req, res, (err) => {
    if (err) {
      handleUploadError(err, next);
    } else {
      next();
    }
  });
};

export const uploadBlogImage = (req: Request, res: Response, next: NextFunction) => {
  upload.single('blogImage')(req, res, (err) => {
    if (err) {
      handleUploadError(err, next);
    } else {
      next();
    }
  });
};

const handleUploadError = (err: any, next: NextFunction) => {
  if (err instanceof multer.MulterError) {
    if (err.code === 'LIMIT_FILE_SIZE') {
      next(new BadRequestError('File size is too large. Max size is 5MB.'));
    } else {
      next(new BadRequestError(err.message));
    }
  } else if (err instanceof Error) {
    next(new BadRequestError(err.message));
  } else {
    next(new BadRequestError('An unknown error occurred during file upload.'));
  }
};