import { isValidObjectId } from "mongoose";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import {
    deleteFromCloudinary,
    uploadOnCloudinary,
} from "../utils/cloudinary.js";

import { Player } from "../models/player.model.js";


export const getPlayers = asyncHandler(async (req, res) => {
    
    const page = Math.max(1, parseInt(req.query.page)) || 1;
    const limit = Math.max(1, parseInt(req.query.limit)) || 10;
    const skip = (page - 1) * limit;

    // filter by team and search by name
    const team = req.query.team?.toUpperCase();
    const search = req.query.search?.trim();
    const sortBy = req.query.sortBy;            // sort by "runs" or "salary"
    const order = req.query.order === "asc" ? 1 : -1;

    // Build query object
    const query = {};
    if (team) {
        query.team = team;
    }
    // search by name
    if (search) {
        query.name = { $regex: search, $options: "i" }; // case-insensitive search
    }

     // Build sort options
    const sortOptions = {};
    if (sortBy === "runs" || sortBy === "salary") {
        sortOptions[sortBy] = order;
    } else {
        sortOptions.createdAt = -1; // Default sort
    }
    // console.log("Sort options:", sortOptions);

    
    const totalPlayers = await Player.countDocuments(query);
    const totalPages = Math.ceil(totalPlayers / limit);
    
    if (page > totalPages && totalPlayers > 0) {
        throw new ApiError(400, "Page number exceeds total pages");
    }

    const players = await Player.find(query)
        .select({ _id: 1, name: 1, image: 1, role: 1, team: 1,  runs: 1, salary: 1 })
        .sort(sortOptions)
        .skip(skip)
        .limit(limit);
    // console.log("Total players:", totalPlayers);

    return res.status(200).json({
        page,
        limit,
        total: totalPlayers,
        totalPages,
        players: players.map(p => ({
            id: p._id,
            name: p.name,
            image: p.image,
            role: p.role,
            team: p.team,
            runs: p.runs,
            salary: p.salary
        }))
    });       
    
});

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

export const updatePlayer = asyncHandler(async (req, res) => {
    const { id } = req.params;

    if (!isValidObjectId(id)) {
        throw new ApiError(400, "Invalid player ID");
    }

    // Check if player exists
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
