import express from 'express';
import { sendEmail } from '../controllers/sendgridController.mjs';
import { isAuthenticated } from '../middleware/auth.mjs';
const router = express.Router();

router.post('/sendEmail', isAuthenticated, sendEmail);

export const sendgridRoutes = router;