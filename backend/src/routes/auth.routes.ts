// src/routes/authRoutes.ts
import express, { Router } from 'express';
import { authenticateJWT } from '../middleware/auth.middleware.js';
import { isAdmin } from '../middleware/role.middleware';
import { 
    register, 
    login,  
    changePassword,
    updateProfile,
    deactivateAccount,
} from '../controllers/auth.controller.js';


const router: Router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.put('/profile', authenticateJWT, updateProfile);
router.put('/change-password', authenticateJWT, changePassword);
router.post('/deactivate', authenticateJWT, deactivateAccount);

export default router;