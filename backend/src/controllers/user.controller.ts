import { NextFunction, Request, Response } from 'express';
import path from 'path';

import User from '../models/user.model';
import { ValidationError, UnauthorizedError, NotFoundError, InternalServerError, CustomError, BadRequestError } from '../utils/custom-errors.util';
import { deleteFileFromStorage } from '../utils/delete-file.util';
import logger from '../utils/logger.util';

export const getUserOwnProfile = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    if (!req.user) {
      throw new UnauthorizedError('User not authenticated');
    }

    // create new object without the password
    const userWithoutPassword = req.user.toObject();
    delete userWithoutPassword.password;

    userWithoutPassword.email = await req.user.getDecryptedEmail();

    logger.debug('User retrieved own profile', { userId: req.user!._id });
    res.json(userWithoutPassword);
  } catch (error) {
    next(error instanceof CustomError ? error : new InternalServerError('Error fetching user profile'));
  }
};


export const updateProfile = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = (req as any).user.userId;
    const { username, email } = req.body;
    const user = await User.findByIdAndUpdate(userId, { username, email }, { new: true }).select('-password');
    if (!user) {
      throw new NotFoundError('User not found');
    }
    res.json(user);
  } catch (error) {
    next(error);
  }
};

export const updateProfilePicture = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = (req as any).user.userId;
    if (!req.file) {
      throw new BadRequestError('No file uploaded');
    }
    const profilePicture = '/' + req.file.path;
    const user = await User.findByIdAndUpdate(userId, { profilePicture }, { new: true }).select('-password');
    if (!user) {
      throw new NotFoundError('User not found');
    }
    res.json({ message: 'Profile picture updated successfully', profilePicture });
  } catch (error) {
    next(error);
  }
};

export const getOtherUserProfile = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const user = await User.findById(req.params.userId).select('-password');
    if (!user) {
      throw new NotFoundError('User');
    }
    res.json(user);
  }  catch (error) {
    // console.error('Error fetching user profile:', error);
    next(error instanceof CustomError ? error : new InternalServerError('Error fetching user profile'));
  }
};


export const deactivateAccount = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = (req as any).user.userId;
    const user = await User.findByIdAndUpdate(userId, { isActive: false }, { new: true });
    if (!user) {
      throw new NotFoundError('User not found');
    }
    res.json({ message: 'Account deactivated successfully' });
  } catch (error) {
    next(error);
  }
};