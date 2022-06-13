import mongoose from "mongoose";

export const ChallengeSchema = new mongoose.Schema({
    challengeDateHour: { type: Date },
    status: { type: String },
    requesterDateHour: { type: Date },
    requester: { type: mongoose.Schema.Types.ObjectId, ref: 'Player' },
    category: { type: String },
    players: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Player'
    }],
    match: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Match'
    }

}, { timestamps: true, collection: 'challenges' });