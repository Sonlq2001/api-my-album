"use strict";

const { model, Schema } = require("mongoose");
const slugify = require("slugify");

const DOCUMENT_NAME = "Category";
const COLLECTION_NAME = "Category";

const categorySchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      maxLength: 100,
      unique: true,
    },
    slug: String,
  },
  {
    timestamps: true,
    collection: COLLECTION_NAME,
  }
);

categorySchema.pre("save", function (next) {
  this.slug = slugify(this.title, { lower: true, locale: "vi", trim: true });
  next();
});

module.exports = model(DOCUMENT_NAME, categorySchema);
