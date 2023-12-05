"use strict";

const AlbumModel = require("../models/album.model");
const { STATUS_ALBUM } = require("../constants/app.constants");
const {
  getAlbumDetail,
  getListAlbums,
} = require("../models/repositories/album.repo");
const {
  convertToObjectIdMongodb,
  getSelectData,
  paginate,
} = require("../utils");

class AlbumService {
  static async getListAlbumsPublic({ cate, page, per_page, keyword, sort }) {
    return await getListAlbums({
      status: STATUS_ALBUM.PUBLIC,
      params: { cate, page, per_page, keyword, sort },
    });
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

  static async getAlbumsUser({ userId, page, per_page, sort = "-createdAt" }) {
    const { skip, limit } = paginate(page, per_page);
    const sortList = sort === "-createdAt" ? -1 : 1;
    const query = {
      user: convertToObjectIdMongodb(userId),
    };

    return {
      list: await AlbumModel.find(query)
        .populate({ path: "category", select: "title" })
        .select(
          getSelectData([
            "_id",
            "title",
            "albums",
            "category",
            "status",
            "slug",
          ])
        )
        .skip(skip)
        .limit(limit)
        .sort({ createdAt: sortList })
        .lean(),
      total: await AlbumModel.count(query),
    };
  }
}

module.exports = AlbumService;
