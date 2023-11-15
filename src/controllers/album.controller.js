"use strict";

const AlbumService = require("../services/album.service");
const SuccessResponse = require("../core/success.response");

class AlbumController {
  static async getListAlbumsPublic(req, res) {
    const { elements, meta } = await AlbumService.getListAlbumsPublic(
      req.query
    );
    new SuccessResponse({
      message: "Danh sách albums !",
      metadata: elements,
      meta,
    }).send(res);
  }

  static async getListAlbumsPrivate(req, res) {
    new SuccessResponse({
      message: "Danh sách albums !",
      metadata: await AlbumService.getListAlbumsPrivate(req.query),
    }).send(res);
  }

  static async createAlbum(req, res) {
    new SuccessResponse({
      message: "Tạo album thành công !",
      metadata: await AlbumService.createAlbum(req.body),
    }).send(res);
  }

  static async getAlbumDetailPublic(req, res) {
    new SuccessResponse({
      message: "Chi tiết album !",
      metadata: await AlbumService.getAlbumDetailPublic(req.params.slug),
    }).send(res);
  }

  static async getAlbumDetailPrivate(req, res) {
    new SuccessResponse({
      message: "Chi tiết album !",
      metadata: await AlbumService.getAlbumDetailPrivate(req.params.slug),
    }).send(res);
  }
}

module.exports = AlbumController;
