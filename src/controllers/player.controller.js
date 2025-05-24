import { isValidObjectId } from "mongoose";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import {
    deleteFromCloudinary,
    uploadOnCloudinary,
} from "../utils/cloudinary.js";

import { Player } from "../models/player.model.js";

// Function to get all players
export const getPlayers = asyncHandler(async (req, res) => {
    const players = await Player.find().select({
        name: 1,
        image: 1,
        role: 1,
        team: 1,
    });

    console.log("Players found:", players);
    // Check if players exist
    if (!players || players.length === 0) {
        throw new ApiError(404, "No players found");
    }
    return res.status(200).json(new ApiResponse(200, players));
});

// Function to get a player by ID
export const getPlayerDetails = asyncHandler(async (req, res) => {
    const { id } = req.params;

    if (!isValidObjectId(id)) {
        throw new ApiError(400, "Invalid player ID");
    }

    const player = await Player.findById(id);
    console.log("Player found:", player);

   
    if (!player) {
        throw new ApiError(404, "Player not found");
    }

    return res.status(200).json(player);
});

// Function to create a new player
export const createPlayer = asyncHandler(async (req, res) => {
    const { name, team, country, runs, role, salary } = req.body;


    const imageLocalpath = req.file?.path;
    // console.log("Image local path:", imageLocalpath);

    if (!imageLocalpath) {
        throw new ApiError(400, "Image file is required");
    }

    // upload into cloudinary
    const image = await uploadOnCloudinary(imageLocalpath);
    // console.log("Image uploaded to Cloudinary:", image);

    if (!image) {
        throw new ApiError(500, "Failed to upload image");
    }

    const player = await Player.create({
        name,
        team,
        country,
        runs,   
        image: image.url,
        role,
        salary,
    });
    if (!player) {
        throw new ApiError(500, "Failed to create player");
    }
    return res.status(201).json({ message: "Player created successfully" });

    // return res.status(201).json(new ApiResponse(201, "Player created successfully"));
});

// Function to update a player by ID
export const updatePlayer = asyncHandler(async (req, res) => {
    const { id } = req.params;

    if (!isValidObjectId(id)) {
        throw new ApiError(400, "Invalid player ID");
    }

    // Find existing player
    const existingPlayer = await Player.findById(id);
    if (!existingPlayer) {
        throw new ApiError(404, "Player not found");
    }
     // Handle image update if a new image is uploaded
    let updatedImageUrl = existingPlayer.image;

    const imageLocalPath = req.file?.path;
    if (imageLocalPath) {
        // Delete old image from Cloudinary
        await deleteFromCloudinary(existingPlayer.image);

        // Upload new image to Cloudinary
        const uploadedImage = await uploadOnCloudinary(imageLocalPath);
        if (!uploadedImage) {
            throw new ApiError(500, "Failed to upload new image");
        }

        updatedImageUrl = uploadedImage.url;
    }

    // Update player details
    const {
        name = existingPlayer.name,
        team = existingPlayer.team,
        country = existingPlayer.country,
        runs = existingPlayer.runs,
        role = existingPlayer.role,
        salary = existingPlayer.salary
    } = req.body;

    // Update player
    existingPlayer.name = name;
    existingPlayer.team = team;
    existingPlayer.country = country;
    existingPlayer.runs = runs;
    existingPlayer.role = role;
    existingPlayer.salary = salary;
    existingPlayer.image = updatedImageUrl;

    await existingPlayer.save();

    console.log("Player updated successfully:", existingPlayer);

    return res.status(200).json({ message: "Player updated successfully" });
});

// Function to delete a player by ID
export const deletePlayer = asyncHandler(async (req, res) => {
    const { id } = req.params;

    if (!isValidObjectId(id)) {
        throw new ApiError(400, "Invalid player ID");
    }

    const player = await Player.findByIdAndDelete(id);

    if (!player) {
        throw new ApiError(404, "Player not found");
    }

    // Delete image from Cloudinary
    await deleteFromCloudinary(player.image);
    console.log("Player deleted successfully:", player);

    return res.status(200).json({ message: "Player deleted successfully" });
});
