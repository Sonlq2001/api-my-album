"use strict";

const { model, Schema, Types } = require("mongoose");

const DOCUMENT_NAME = "Key";
const COLLECTION_NAME = "Key";

const keyTokenSchema = new Schema(
  {
    user: {
      type: Types.ObjectId,
      required: true,
      ref: "User",
    },
    private_key: {
      type: String,
      required: true,
    },
    public_key: {
      type: String,
      required: true,
    },
    refresh_token: {
      type: String,
      required: true,
    },
    refresh_token_used: {
      type: Array,
      default: [],
    },
  },
  {
    timestamps: true,
    collection: COLLECTION_NAME,
  }
);

module.exports = model(DOCUMENT_NAME, keyTokenSchema);
