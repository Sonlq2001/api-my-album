"use strict";

const AlbumModel = require("../models/album.model");
const { STATUS_ALBUM } = require("../constants/app.constants");
const {
  getAlbumDetail,
  getListAlbums,
  getCountAlbums,
} = require("../models/repositories/album.repo");

class AlbumService {
  static async getListAlbumsPublic({ cate, page, per_page, keyword, sort }) {
    return {
      elements: await getListAlbums({
        status: STATUS_ALBUM.PUBLIC,
        params: { cate, page, per_page, keyword, sort },
      }),
      meta: {
        total: await getCountAlbums({ status: STATUS_ALBUM.PUBLIC, cate }),
      },
    };
  }

  static async getListAlbumsPrivate({ cate }) {
    return await getListAlbums({
      status: STATUS_ALBUM.PRIVATE,
      params: { cate },
    });
  }

  static async createAlbum(data) {
    const newAlbum = await AlbumModel.create(data);
    return newAlbum;
  }

  static async getAlbumDetailPublic(slug) {
    return await getAlbumDetail({
      slug,
      status: STATUS_ALBUM.PUBLIC,
      unSelect: ["__v", "status"],
    });
  }

  static async getAlbumDetailPrivate(slug) {
    return await getAlbumDetail({
      slug,
      status: STATUS_ALBUM.PRIVATE,
      unSelect: ["__v", "status"],
    });
  }
}

module.exports = AlbumService;
