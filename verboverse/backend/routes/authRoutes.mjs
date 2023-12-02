import express from 'express';
import { signup, signin, logout, userProfile, updateUserProfile } from '../controllers/authController.mjs';
import { isAuthenticated } from '../middleware/auth.mjs';
const router = express.Router();

router.post('/signup', signup);
router.post('/signin', signin); 
router.get('/logout', logout);
router.get('/me', isAuthenticated, userProfile); 
router.patch('/updateme', updateUserProfile);

export const authRoutes = router;