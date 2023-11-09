"use strict";

const express = require("express");

const UploadController = require("../../controllers/upload.controller");
const asyncHandler = require("../../helpers/async-handler");
const { authentication } = require("../../utils/authUtils");

const uploadMulter = require("../../middleware/upload-multer");

const router = express.Router();

router.use(authentication);

router.use(uploadMulter);

router.post("/album/files", asyncHandler(UploadController.uploadFiles));

module.exports = router;
