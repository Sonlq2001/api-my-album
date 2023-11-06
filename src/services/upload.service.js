"use strict";

const fs = require("fs");
const cloudinaryUploads = require("../helpers/upload-cloudinary");

class UploadController {
  static async uploadFiles(files) {
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

module.exports = UploadController;
