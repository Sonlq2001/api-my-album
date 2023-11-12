"use strict";

const express = require("express");

const AlbumController = require("../../controllers/album.controller");
const asyncHandler = require("../../helpers/async-handler");
const { authentication } = require("../../utils/authUtils");

const router = express.Router();

router.get("/list/public", asyncHandler(AlbumController.getListAlbumsPublic));
router.get("/public/:slug", asyncHandler(AlbumController.getAlbumDetailPublic));

router.use(authentication);

router.get("/list/private", asyncHandler(AlbumController.getListAlbumsPrivate));
router.post("/create", asyncHandler(AlbumController.createAlbum));
router.get(
  "/private/:slug",
  asyncHandler(AlbumController.getAlbumDetailPrivate)
);

module.exports = router;
