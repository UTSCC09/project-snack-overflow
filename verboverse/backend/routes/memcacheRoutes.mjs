import express from 'express';
import { cacheData, getData } from '../controllers/memcacheController.mjs';
const router = express.Router();

router.post('/cache', cacheData); 
router.get('/getCache', getData);

export const memcacheRoutes = router;