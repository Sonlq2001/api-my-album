"use strict";

const UserModel = require("../models/user.model");
const { convertToObjectIdMongodb } = require("../utils");
const { unGetSelectData } = require("../utils");

class UserService {
  static async findUserById(userId) {
    return await UserModel.findById(userId)
      .select(unGetSelectData(["password", "createdAt", "updatedAt", "__v"]))
      .lean();
  }

  static async updateUser({ userId, ...rest }) {
    return await UserModel.findOneAndUpdate(
      { _id: convertToObjectIdMongodb(userId) },
      rest,
      {
        new: true,
      }
    );
  }
}

module.exports = UserService;
