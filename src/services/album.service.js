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
const UserService = require("./user.service");
const { BadRequestError } = require("../core/error.response");

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

  static async getAlbumDetailPublic({ slug, userId }) {
    return await getAlbumDetail({
      slug,
      userId,
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

  static async getAlbumsUser({
    userId,
    page,
    per_page,
    sort = "-createdAt",
    filter = "all",
  }) {
    const { skip, limit } = paginate(page, per_page);
    const sortList = sort === "-createdAt" ? -1 : 1;

    const query =
      filter === "all"
        ? {
            user: convertToObjectIdMongodb(userId),
          }
        : {
            user: convertToObjectIdMongodb(userId),
            status:
              filter === "public" ? STATUS_ALBUM.PUBLIC : STATUS_ALBUM.PRIVATE,
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

  static async getUserAlbumsInfo({ slugUser, page, per_page }) {
    const userInfo = await UserService.getUserInfo(slugUser);
    if (!userInfo) {
      throw new BadRequestError("User không tồn tại !");
    }

    const { skip, limit } = paginate(page, per_page);

    const query = {
      user: convertToObjectIdMongodb(userInfo._id),
      status: STATUS_ALBUM.PUBLIC,
    };

    return {
      list: await AlbumModel.find(query)
        .populate({ path: "category", select: "title -_id" })
        .skip(skip)
        .limit(limit)
        .select(getSelectData(["_id", "title", "albums", "category", "slug"]))
        .lean(),
      total: await AlbumModel.count(query),
    };
  }

  static async getSearchAlbums({ keyword }) {
    const regexSearch = new RegExp(keyword);

    const query = {
      $text: { $search: regexSearch },
      status: STATUS_ALBUM.PUBLIC,
    };

    return {
      list: await AlbumModel.find(query)
        .select(getSelectData(["title", "albums", "slug", "date"]))
        .lean(),
      total: await AlbumModel.count(query),
    };
  }

  static async deleteManyAlbums({ listId = [] }) {
    const deleteSuccess = await AlbumModel.deleteMany({ _id: { $in: listId } });
    return deleteSuccess;
  }
}

module.exports = AlbumService;
