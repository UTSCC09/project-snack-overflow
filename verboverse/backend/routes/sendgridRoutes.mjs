import express from 'express';
import { sendEmail } from '../controllers/sendgridController.mjs';
const router = express.Router();

router.post('/sendEmail', sendEmail);

export const sendgridRoutes = router;