"use strict";

const UploadService = require("../services/upload.service");
const SuccessResponse = require("../core/success.response");

class UploadController {
  static async uploadFiles(req, res) {
    new SuccessResponse({
      message: "Upload files thành công !",
      metadata: await UploadService.uploadFiles(req.files),
    }).send(res);
  }
}

module.exports = UploadController;
