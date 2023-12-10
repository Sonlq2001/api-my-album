"use strict";

const BookmarkService = require("../services/bookmark.service");
const SuccessResponse = require("../core/success.response");

class BookmarkController {
  static async toggleBookmark(req, res) {
    const { album_id } = req.body;
    new SuccessResponse({
      message: "Ok",
      metadata: await BookmarkService.toggleBookmark({
        albumId: album_id,
        userId: req.user.userId,
      }),
    }).send(res);
  }
}

module.exports = BookmarkController;
