"use strict";

const AlbumModel = require("../models/album.model");
const { STATUS_ALBUM } = require("../constants/app.constants");

class AlbumService {
  static async getListAlbumsPublic() {
    return await AlbumModel.find({ status: STATUS_ALBUM.PUBLIC }).lean();
  }

  static async getListAlbumsPrivate() {
    return await AlbumModel.find({ status: STATUS_ALBUM.PRIVATE }).lean();
  }

  static async createAlbum(data) {
    const newAlbum = AlbumModel.create(data);
    return newAlbum;
  }
}

module.exports = AlbumService;
