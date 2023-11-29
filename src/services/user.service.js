"use strict";

const UserModel = require("../models/user.model");
const { convertToObjectIdMongodb } = require("../utils");

class UserService {
  static async findUserById(userId) {
    return await UserModel.findById(userId).lean();
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
