const express = require("express");

const BookmarkController = require("../../controllers/bookmark.controller");
const asyncHandler = require("../../helpers/async-handler");
const { authentication } = require("../../utils/authUtils");

const router = express.Router();

router.use(authentication);

router.patch("/album", asyncHandler(BookmarkController.toggleBookmark));

router.get(
  "/album_list",
  asyncHandler(BookmarkController.getListAlbumsBookmark)
);

module.exports = router;
