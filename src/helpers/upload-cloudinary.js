"use strict";

const cloudinary = require("../configs/config.cloudinary");
const {
  FOLDER_UPLOAD_IMAGES_CLOUDINARY,
} = require("../constants/app.constants");

const cloudinaryUploads = async (file) => {
  try {
    const resCloudinary = await cloudinary.uploader.upload(file, {
      folder: FOLDER_UPLOAD_IMAGES_CLOUDINARY,
    });

    return {
      url: resCloudinary.url,
      id: resCloudinary.public_id,
    };
  } catch (error) {
    throw error;
  }
};

module.exports = cloudinaryUploads;
