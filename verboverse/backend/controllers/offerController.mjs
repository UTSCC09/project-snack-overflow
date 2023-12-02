import Call from '../models/callModel.js';
import offerModel from '../models/offerModel.mjs';
import { ErrorResponse } from '../utils/errorResponse.mjs';

export async function createOfferCandidates (req, res, next) {
    try {
        const {offerCandidates} = req.body;
        const call = await Call.findById(req.params.id);
        if (!call) {
            return next(new ErrorResponse('Call not found', 404));
        }
        const offerCandidate = await offerModel.create(offerCandidates);
        call.offerCandidates.push(offerCandidate);
        await call.save();
        res.status(201).json({
            success: true,
            call
        });
    } catch (error) {
        next(error);
    }
}