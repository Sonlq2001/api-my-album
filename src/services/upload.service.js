"use strict";

const fs = require("fs");

const cloudinaryUploads = require("../helpers/upload-cloudinary");

const { BadRequestError } = require("../core/error.response");

class UploadService {
  static async uploadFiles(files) {
    if (!files.length) {
      throw new BadRequestError("Không có file nào được tải lên !");
    }

    const urls = [];

    for (const file of files) {
      const path = file.path;
      const resImage = await cloudinaryUploads(path);
      urls.push(resImage);
      fs.unlinkSync(path);
    }

    return urls;
  }
}

module.exports = UploadService;
