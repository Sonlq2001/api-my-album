"use strict";

const BookmarkModel = require("../models/bookmark.model");

const { convertToObjectIdMongodb, paginate } = require("../utils");

class BookmarkService {
  static async toggleBookmark({ userId, albumId }) {
    const isExistAlbum = await BookmarkModel.findOne({
      user: convertToObjectIdMongodb(userId),
      bookmarks: { $in: albumId },
    }).lean();

    const query = isExistAlbum
      ? { $pull: { bookmarks: albumId } }
      : { $addToSet: { bookmarks: albumId } };

    await BookmarkModel.findOneAndUpdate(
      { user: convertToObjectIdMongodb(userId) },
      {
        userId,
        ...query,
      },
      { upsert: true, new: true }
    );

    return { new_value: Boolean(!isExistAlbum) };
  }

  static async getListAlbumsBookmark({
    userId,
    page,
    per_page,
    sort = "-createdAt",
  }) {
    const { skip, limit } = paginate(page, per_page);
    const sortList = sort === "-createdAt" ? -1 : 1;

    const query = {
      user: convertToObjectIdMongodb(userId),
    };

    const lengthData = await BookmarkModel.findOne(query)
      .select({ _id: 0, bookmarks: 1 })
      .lean();

    const { bookmarks } = await BookmarkModel.findOne(query)
      .populate({
        path: "bookmarks",
        select: "title slug albums category",
        options: { sort: { createdAt: sortList }, skip, limit },
        populate: {
          path: "category",
          model: "Category",
          select: "title -_id",
        },
      })
      .select({ _id: 0, bookmarks: 1 })
      .lean();

    return {
      list: bookmarks || [],
      total: lengthData?.bookmarks.length || 0,
    };
  }
}

module.exports = BookmarkService;
