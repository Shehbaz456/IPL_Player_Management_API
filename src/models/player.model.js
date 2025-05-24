import mongoose from "mongoose";

const playerSchema = new mongoose.Schema(
    {
        name: { type: String, required: true , trim: true },
        team: {type: String, required: true, trim: true, uppercase: true}, 
        country: { type: String, required: true , trim: true },
        runs: { type: Number, required: true },
        image: { type: String , required: true }, // URL from Cloudinary
        role: {
            type: String,
            enum: ["Batsman", "Bowler", "All-rounder"],
            required: true,
        },
        salary: { type: Number, required: true },
    },
    { timestamps: true }
);

export const Player = mongoose.model("Player", playerSchema);


