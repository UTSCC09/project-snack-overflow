import mongoose from 'mongoose';

const answerSchema = new mongoose.Schema({
    answerCandidates: [
        {
        answerCandidateId: {
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

export default mongoose.models?.Answer || mongoose.model('Answer', answerSchema);
