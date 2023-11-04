"use strict";

const UserModel = require("../models/user.model");

class UserService {
  static async findUserById(userId) {
    return await UserModel.findById(userId).lean();
  }
}

module.exports = UserService;
