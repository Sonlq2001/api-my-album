"use strict";

const { Types, Schema, model } = require("mongoose");
const slugify = require("slugify");

const DOCUMENT_NAME = "Album";
const COLLECTION_NAME = "Album";

const albumSchema = new Schema(
  {
    title: { type: String, required: true },
    user: {
      type: Types.ObjectId,
      ref: "User",
      required: true,
    },
    event_album: {
      type: String,
    },
    albums: {
      type: [
        {
          image_url: {
            type: String,
            required: true,
          },
          public_id: {
            type: String,
            required: true,
          },
        },
      ],
      default: [],
      required: true,
    },
    story: String,
    date: {
      type: Date,
      required: true,
    },
    category: {
      type: Types.ObjectId,
      ref: "Category",
      required: true,
    },
    status: {
      type: Number,
      default: 0, // 0: public, 1 private
    },
    slug: String,
  },
  {
    timestamps: true,
    collection: COLLECTION_NAME,
  }
);

// create index for search
albumSchema.index({ title: "text" });

albumSchema.pre("save", function (next) {
  this.slug = slugify(this.title, { lower: true, locale: "vi", trim: true });
  next();
});

module.exports = model(DOCUMENT_NAME, albumSchema);
