"use strict";

const BookmarkService = require("../services/bookmark.service");
const SuccessResponse = require("../core/success.response");

class BookmarkController {
  static async toggleBookmark(req, res) {
    const { albumId, userId } = req.body;
    new SuccessResponse({
      message: "Ok",
      metadata: await BookmarkService.toggleBookmark({
        albumId,
        userId: req.user.userId,
      }),
    }).send(res);
  }
}

module.exports = BookmarkController;
