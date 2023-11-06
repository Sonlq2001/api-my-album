"use strict";

const express = require("express");

const AlbumController = require("../../controllers/album.controller");
const asyncHandler = require("../../helpers/async-handler");
const { authentication } = require("../../utils/authUtils");

const router = express.Router();

router.use(authentication);

router.get("/albums", asyncHandler(AlbumController.getListAlbums));
router.post("/album_create", asyncHandler(AlbumController.createAlbum));

module.exports = router;
