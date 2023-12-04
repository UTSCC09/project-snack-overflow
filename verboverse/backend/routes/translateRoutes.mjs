import express from 'express';
import { translateText } from '../controllers/translateController.mjs';
import { isAuthenticated } from '../middleware/auth.mjs';
const router = express.Router();

router.post('/translate', isAuthenticated, translateText); 
// router.get('/getCache', getData);

export const translateRoutes = router;