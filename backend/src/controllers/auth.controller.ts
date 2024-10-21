import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/user.model';
import { BadRequestError, UnauthorizedError, NotFoundError } from '../utils/custom-errors.util';
import { JWT_SECRET } from '../config/environment';
import { setTokenCookie, clearTokenCookie } from '../middleware/auth.middleware';

export const register = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { username, email, password } = req.body;
    const user = new User({ username, email, password });
    await user.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    next(error);
  }
};

export const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || !(await user.comparePassword(password))) {
      throw new UnauthorizedError('Invalid credentials');
    }
    const token = jwt.sign({ userId: user._id, role: user.role }, JWT_SECRET, { expiresIn: '1d' });
    setTokenCookie(res, token);
    res.json({ message: 'Login successful', user: { id: user._id, role: user.role } });
  } catch (error) {
    next(error);
  }
};

export const logout = async (req: Request, res: Response, next: NextFunction) => {
  try {
    clearTokenCookie(res);
    res.json({ message: 'Logout successful' });
  } catch (error) {
    next(error);
  }
};

export const updateProfile = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = (req as any).user.userId;
    const { username, email } = req.body;
    const user = await User.findByIdAndUpdate(userId, { username, email }, { new: true });
    if (!user) {
      throw new NotFoundError('User not found');
    }
    res.json(user);
  } catch (error) {
    next(error);
  }
};

export const changePassword = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = (req as any).user.userId;
    const { currentPassword, newPassword } = req.body;
    const user = await User.findById(userId);
    if (!user || !(await user.comparePassword(currentPassword))) {
      throw new UnauthorizedError('Invalid current password');
    }
    user.password = newPassword;
    await user.save();
    res.json({ message: 'Password changed successfully' });
  } catch (error) {
    next(error);
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