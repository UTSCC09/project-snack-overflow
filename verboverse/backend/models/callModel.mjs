import mongoose from 'mongoose';
import offerSchema from './offerModel.mjs';
import answerSchema from './answerModel.mjs';

const callSchema = new mongoose.Schema({
    id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    offer: {
        sdp: {
            type: String,
            minlength: 3
        },
        type: {
            type: String,
        },
    },
    answer: {
        sdp: {
            type: String,
            // required: true,
            minlength: 3
        },
        type: {
            type: String,
            // required: true,
        },
    },
    offerCandidates: {
        type: [offerSchema.schema], 
        // required: true,
    },
    answerCandidates: {
        type: [answerSchema.schema], 
        // required: true,
    },
}); 

export default mongoose.models?.Call || mongoose.model('Call', callSchema);
