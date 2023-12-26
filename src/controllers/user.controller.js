const SuccessResponse = require("../core/success.response");
const UserService = require("../services/user.service");
const { removeUndefinedObject } = require("../utils");

class UserController {
  static async updateUser(req, res) {
    new SuccessResponse({
      message: "Cập nhập thông tin thành công !",
      metadata: await UserService.updateUser(
        removeUndefinedObject({
          ...req.body,
          userId: req.params.user_id,
        })
      ),
    }).send(res);
  }

  static async getUser(req, res) {
    new SuccessResponse({
      message: "Thông tin cá nhân !",
      metadata: await UserService.findUserById(req.params.user_id),
    }).send(res);
  }

  static async getUserInfo(req, res) {
    console.log(req.params.slug_user);
    new SuccessResponse({
      message: "Thông tin người dùng !",
      metadata: await UserService.getUserInfo(req.params.slug_user),
    }).send(res);
  }
}

module.exports = UserController;
