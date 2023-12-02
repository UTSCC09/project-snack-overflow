import mongoose from 'mongoose';

const offerSchema = new mongoose.Schema({
    offerCandidates: [
        {
        offerCandidateId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Call'
        }, 
        candidate: {
            type: String,
            required: true,
        },
        sdpMLineIndex: {
            type: Number,
            default: 0,
        },
        sdpMid: {
            type: String,
            required: true,
        },
        usernameFragment: {
            type: String,
            required: true,
        }
    }
],
}); 

export default mongoose.models?.Offer || mongoose.model('Offer', offerSchema);
