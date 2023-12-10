"use strict";

const BookmarkModel = require("../models/bookmark.model");

const { convertToObjectIdMongodb } = require("../utils");

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
}

module.exports = BookmarkService;
