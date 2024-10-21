import express from 'express';
import { updateProfile, updateProfilePicture, deactivateAccount, getOtherUserProfile, getUserOwnProfile } from '../controllers/user.controller';
import { authenticateJWT } from '../middleware/auth.middleware';
import { uploadProfilePicture } from '../middleware/upload.middleware';

const router = express.Router();

router.get('/users/:id', authenticateJWT, getOtherUserProfile);
router.get('/me', authenticateJWT, getUserOwnProfile);
router.put('/profile', authenticateJWT, updateProfile);
router.put('/profile-picture', authenticateJWT, uploadProfilePicture, updateProfilePicture);
router.post('/deactivate', authenticateJWT, deactivateAccount);

export default router;
