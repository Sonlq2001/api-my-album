"use strict";

const AlbumService = require("../services/album.service");
const SuccessResponse = require("../core/success.response");
const { HEADER } = require("../utils/authUtils");

class AlbumController {
  static async getListAlbumsPublic(req, res) {
    const { list, total } = await AlbumService.getListAlbumsPublic(req.query);
    new SuccessResponse({
      message: "Danh sách albums !",
      metadata: list,
      meta: { total },
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
      metadata: await AlbumService.getAlbumDetailPublic({
        slug: req.params.slug,
        userId: req.headers[HEADER.CLIENT_ID],
      }),
    }).send(res);
  }

  static async getAlbumDetailPrivate(req, res) {
    new SuccessResponse({
      message: "Chi tiết album !",
      metadata: await AlbumService.getAlbumDetailPrivate(req.params.slug),
    }).send(res);
  }

  static async getAlbumsUser(req, res) {
    const { list, total } = await AlbumService.getAlbumsUser({
      ...req.query,
      userId: req.user.userId,
    });
    new SuccessResponse({
      message: "Danh sách albums của bạn !",
      metadata: list,
      meta: { total },
    }).send(res);
  }

  static async getUserAlbumsInfo(req, res) {
    const { list, total } = await AlbumService.getUserAlbumsInfo({
      ...req.query,
      slugUser: req.params.slug_user,
    });
    new SuccessResponse({
      message: "Danh sách albums !",
      metadata: list,
      meta: { total },
    }).send(res);
  }

  static async getSearchAlbums(req, res) {
    const { list, total } = await AlbumService.getSearchAlbums({
      keyword: req.query.q,
    });
    new SuccessResponse({
      message: "Kết quả tìm kiếm !",
      metadata: list,
      meta: { total },
    }).send(res);
  }
}

module.exports = AlbumController;
