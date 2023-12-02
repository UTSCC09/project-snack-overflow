import express from 'express';
import { translateText } from '../controllers/translateController.mjs';
const router = express.Router();

router.post('/translate', translateText); 
// router.get('/getCache', getData);

export const translateRoutes = router;