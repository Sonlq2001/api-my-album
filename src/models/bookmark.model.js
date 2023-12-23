"use strict";

const { model, Schema, Types } = require("mongoose");

const DOCUMENT_NAME = "Bookmark";
const COLLECTION_NAME = "Bookmark";

const bookmarkSchema = new Schema(
  {
    user: { type: Types.ObjectId, ref: "User", required: true },
    bookmarks: [{ type: Types.ObjectId, ref: "Album", required: true }],
  },
  {
    timestamps: true,
    collection: COLLECTION_NAME,
  }
);

module.exports = model(DOCUMENT_NAME, bookmarkSchema);
