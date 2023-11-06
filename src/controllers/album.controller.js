"use strict";

const AlbumService = require("../services/album.service");
const SuccessResponse = require("../core/success.response");

class AlbumController {
  static async getListAlbums(req, res) {
    new SuccessResponse({
      message: "Danh sách albums !",
      metadata: await AlbumService.getListAlbums(req.query),
    }).send(res);
  }

  static async createAlbum(req, res) {
    new SuccessResponse({
      message: "Tạo album thành công !",
      metadata: await AlbumService.createAlbum(req.body),
    }).send(res);
  }
}

module.exports = AlbumController;
