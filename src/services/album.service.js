"use strict";

const AlbumModel = require("../models/album.model");

class AlbumService {
  static async getListAlbums({ status }) {
    return await AlbumModel.find({ status }).lean();
  }

  static async createAlbum(data) {
    const newAlbum = AlbumModel.create(data);
    return newAlbum;
  }
}

module.exports = AlbumService;
