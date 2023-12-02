import express from 'express';
import {  createCall, getCall, getCalls, addOfferCandidates, addOffer} from '../controllers/callController.mjs';
// import { isAuthenticated } from '../middleware/auth.mjs';
const router = express.Router();

router.post('/createCall', createCall);
router.patch('/addOfferCandidates/:id', addOfferCandidates); 
router.patch('/addOffer/:id', addOffer); 
router.get('/getCall/:id/', getCall);
router.get('/getCalls', getCalls);

export const callRoutes = router;