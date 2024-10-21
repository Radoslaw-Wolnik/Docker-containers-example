// routes/adminRoutes.ts
import express, { Router } from 'express';
import { authenticateJWT } from '../middleware/auth.middleware';
import { isAdmin } from '../middleware/role.middleware';
import {
  getAllUsers,
  updateUserRole,
  deleteUser,
} from '../controllers/admin.controller';


const router: Router = express.Router();

// Ensure all routes are protected and require admin privileges
router.use(authenticateJWT, isAdmin);

router.get('/users', getAllUsers);
router.delete('/user/:id', deleteUser);
router.put('/user/:id', updateUserRole);

export default router;