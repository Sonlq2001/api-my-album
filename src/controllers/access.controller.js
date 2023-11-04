"use strict";

const AccessService = require("../services/access.service");
const SuccessResponse = require("../core/success.response");

class AccessController {
  static async login(req, res) {
    new SuccessResponse({
      message: "Đăng nhập thành công !",
      metadata: await AccessService.login({
        payload: req.body,
        res,
      }),
    }).send(res);
  }

  static async signUp(req, res) {
    new SuccessResponse({
      message: "Đăng ký tài khoản thành công !",
      metadata: await AccessService.signUp(req.body),
    }).send(res);
  }

  static async refreshToken(req, res) {
    new SuccessResponse({
      message: "Refresh token thành công !",
      metadata: await AccessService.refreshToken({
        refreshTokenHeader: req.cookies.refresh_token,
        res,
      }),
    }).send(res);
  }

  static async logout(req, res) {
    new SuccessResponse({
      message: "Logout thành công !",
      metadata: await AccessService.logout(req.user.userId, res),
    }).send(res);
  }
}

module.exports = AccessController;
