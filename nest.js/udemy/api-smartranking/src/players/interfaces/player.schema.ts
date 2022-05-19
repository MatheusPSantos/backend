import mongoose from "mongoose";

export const PlayerSchema = new mongoose.Schema({
    phoneNumber: String,
    email: { type: String, unique: true },
    name: String,
    ranking: String,
    positionRanking: Number,
    urlPhotoPlayer: String
}, {
    timestamps: true,
    collection: 'players'
});
