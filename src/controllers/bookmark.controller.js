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

  static async getListAlbumsBookmark(req, res) {
    const { list, total } = await BookmarkService.getListAlbumsBookmark({
      userId: req.user.userId,
      ...req.query,
    });
    new SuccessResponse({
      message: "Danh sách albums đã lưu",
      metadata: list,
      meta: { total },
    }).send(res);
  }
}

module.exports = BookmarkController;
