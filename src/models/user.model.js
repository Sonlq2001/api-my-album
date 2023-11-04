"use strict";

const { model, Schema } = require("mongoose");

const DOCUMENT_NAME = "User";
const COLLECTION_NAME = "User";

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      maxLength: 100,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
    },
    roles: {
      type: Array,
      default: [],
    },
    verify: {
      type: Schema.Types.Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    collection: COLLECTION_NAME,
  }
);

module.exports = model(DOCUMENT_NAME, userSchema);
