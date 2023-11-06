"use strict";

const AlbumService = require("../services/album.service");
const SuccessResponse = require("../core/success.response");

class AlbumController {
  static async getAlbums(req, res) {
    return res.status(200).json({ data: [{ image: "", title: "1" }] });
  }

  static async createAlbum(req, res) {
    new SuccessResponse({
      message: "Tạo album thành công !",
      metadata: await AlbumService.createAlbum(req.body),
    }).send(res);
  }
}

module.exports = AlbumController;
