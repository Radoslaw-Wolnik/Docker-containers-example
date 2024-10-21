// src/controllers/admin.controller.ts

import { Request, Response, NextFunction } from 'express';
import User from '../models/user.model';
import { NotFoundError, BadRequestError } from '../utils/custom-errors.util';

export const getAllUsers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const users = await User.find().select('-password');
    res.json(users);
  } catch (error) {
    next(error);
  }
};

export const deleteUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const user = await User.findByIdAndDelete(id);
    if (!user) {
      throw new NotFoundError('User not found');
    }
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    next(error);
  }
};

export const updateUserRole = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const { role } = req.body;
    if (role !== 'user' && role !== 'admin') {
      throw new BadRequestError('Invalid role');
    }
    const user = await User.findByIdAndUpdate(id, { role }, { new: true }).select('-password');
    if (!user) {
      throw new NotFoundError('User not found');
    }
    res.json(user);
  } catch (error) {
    next(error);
  }
};