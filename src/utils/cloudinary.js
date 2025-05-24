import dotenv from "dotenv";
dotenv.config(); 
import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import { log } from "console";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadOnCloudinary = async (localFilePath) => {
  try {
    console.log("Uploading file to Cloudinary:", localFilePath);
    if (!localFilePath) return null;

    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "image",
      allowed_formats: ["jpeg", "png", "jpg", "webp"],
      folder: "ipl-players",
    });

    console.log("File uploaded successfully URL:", response.url);
    // Delete the local file after upload
    fs.unlinkSync(localFilePath);
    return response;
  } catch (error) {
    console.log("Error in file upload :", error);
    if (error.message.includes("Invalid file format")) {
      console.error("Invalid file format. Allowed formats are jpeg, png, jpg, webp.");
    } else {
      console.error("Error uploading image to Cloudinary:", error);
    }
    fs.unlinkSync(localFilePath);
    return null;
  }
};

const deleteFromCloudinary = async (imageUrl) => {
  if (!imageUrl) return;

  try {
    const urlParts = imageUrl.split("/");
    const publicIdWithExtension = urlParts.slice(7).join("/"); // skip the domain parts
    const publicId = publicIdWithExtension.replace(/\.[^/.]+$/, ""); // remove extension

    const result = await cloudinary.uploader.destroy(publicId);
    console.log("Deleted from Cloudinary:", result);
    return result;
  } catch (error) {
    console.error("Error deleting image from Cloudinary:", error);
    return null;
  }
};

export { uploadOnCloudinary,deleteFromCloudinary };
