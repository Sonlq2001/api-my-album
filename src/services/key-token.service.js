"use strict";

const { Types } = require("mongoose");

const KeyTokenModel = require("../models/key-token.model");
const { toSnakeCase } = require("../helpers/convert-object");
const { convertToObjectIdMongodb } = require("../utils");

class KeyTokenService {
  static async createKeyToken({ userId, publicKey, privateKey, refreshToken }) {
    const filter = { user: userId },
      update = toSnakeCase({ publicKey, privateKey, refreshToken }),
      options = { upsert: true, new: true };

    const tokens = await KeyTokenModel.findOneAndUpdate(
      filter,
      update,
      options
    ).lean();

    return tokens?.public_key || null;
  }

  static async findByUserId(userId) {
    return await KeyTokenModel.findOne({
      user: convertToObjectIdMongodb(userId),
    });
  }

  static async deleteKeyTokenById(userId) {
    return await KeyTokenModel.deleteOne({
      user: convertToObjectIdMongodb(userId),
    }).lean();
  }

  static async findByRefreshToken(refreshToken) {
    return await KeyTokenModel.findOne({
      refresh_token: refreshToken,
    });
  }

  static async updateRefreshToken() {
    return updateOne({
      $set: {
        refresh_token: refreshToken,
      },
      $addToSet: { refresh_token_used: refreshTokenHeader },
    });
  }
}

module.exports = KeyTokenService;
