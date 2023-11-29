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
}

module.exports = UserController;
