"use strict";

const { model, Schema } = require("mongoose");
const slugify = require("slugify");

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
      type: Object,
    },
    background: {
      type: Object,
    },
    roles: {
      type: Array,
      default: [],
    },
    verify: {
      type: Schema.Types.Boolean,
      default: false,
    },
    slug: {
      type: String,
    },
  },
  {
    timestamps: true,
    collection: COLLECTION_NAME,
  }
);

userSchema.pre("save", function (next) {
  this.slug = slugify(this.name, { lower: true, locale: "vi", trim: true });
  next();
});

module.exports = model(DOCUMENT_NAME, userSchema);
