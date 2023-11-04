"use strict";

const bcrypt = require("bcrypt");
const crypto = require("crypto");

const UserModel = require("../models/user.model");
const {
  BadRequestError,
  AuthFailureError,
  ForbiddenError,
} = require("../core/error.response");
const KeyTokenService = require("./key-token.service");
const {
  createTokenPair,
  verifyJWT,
  clearCookieRefreshToken,
  setCookieRefreshToken,
} = require("../utils/authUtils");
const { getInFoData } = require("../utils");
const UserService = require("../services/user.service");
const { KEY_TOKEN } = require("../constants/token.constants");

class AccessService {
  static async login({ payload, res }) {
    const { email, password } = payload;
    const foundUser = await UserModel.findOne({ email }).lean();

    if (!foundUser) {
      throw new BadRequestError("Tài khoản chưa được đăng ký !");
    }

    const isMatchPassword = await bcrypt.compare(password, foundUser.password);
    if (!isMatchPassword) {
      throw new AuthFailureError("Mật khẩu không chính xác !");
    }

    const privateKey = crypto.randomBytes(64).toString("hex");
    const publicKey = crypto.randomBytes(64).toString("hex");

    const { _id: userId } = foundUser;
    const { accessToken, refreshToken } = createTokenPair(
      { userId, email },
      publicKey,
      privateKey
    );

    await KeyTokenService.createKeyToken({
      refreshToken,
      privateKey,
      publicKey,
      userId,
    });

    setCookieRefreshToken(res, refreshToken);

    return {
      ...getInFoData({
        fields: ["_id", "email", "name", "role"],
        object: foundUser,
      }),
      accessToken,
    };
  }

  static async signUp({ name, email, password }) {
    const foundUser = await UserModel.findOne({ email }).lean();
    if (foundUser) {
      throw new BadRequestError("Email đã tồn tại !");
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const newUser = await UserModel.create({
      name,
      email,
      password: passwordHash,
    });

    if (!newUser) {
      return null;
    }

    const privateKey = crypto.randomBytes(64).toString("hex");
    const publicKey = crypto.randomBytes(64).toString("hex");

    const keyStore = await KeyTokenService.createKeyToken({
      publicKey,
      privateKey,
      userId: newUser._id,
    });

    if (!keyStore) {
      throw new BadRequestError("Không thể tạo key store");
    }

    const { accessToken, refreshToken } = createTokenPair(
      { userId: newUser._id, email },
      publicKey,
      privateKey
    );

    return {
      ...getInFoData({
        fields: ["_id", "email", "name", "role"],
        object: newUser,
      }),
      accessToken,
    };
  }

  static async refreshToken({ refreshTokenHeader, res }) {
    if (!refreshTokenHeader) {
      throw new AuthFailureError("Không thể xác thực !");
    }

    const keyStore = await KeyTokenService.findByRefreshToken(
      refreshTokenHeader
    );

    if (!keyStore) {
      throw new AuthFailureError("Không thể xác thực !");
    }

    const { refresh_token_used, private_key, public_key, user } = keyStore;

    await verifyJWT({
      token: refreshTokenHeader,
      keySecret: private_key,
      key: KEY_TOKEN.REFRESH_TOKEN,
      userId: user,
    }); // check refresh token expired

    if (refresh_token_used.includes(refreshTokenHeader)) {
      // remove refresh token used
      await KeyTokenService.deleteKeyTokenById(user);
      clearCookieRefreshToken(res);

      throw new ForbiddenError("Đã xảy ra vấn đề ? Vui lòng đăng nhập lại");
    }

    const foundUser = await UserService.findUserById(user);

    if (!foundUser) {
      throw new AuthFailureError("User không tồn tại");
    }

    const { accessToken, refreshToken } = createTokenPair(
      { userId: foundUser._id, email: foundUser.email },
      public_key,
      private_key
    );

    await keyStore.updateOne({
      $set: {
        refresh_token: refreshToken,
      },
      $addToSet: { refresh_token_used: refreshTokenHeader },
    });

    setCookieRefreshToken(res, refreshToken);

    return {
      accessToken,
    };
  }

  static async logout(userId, res) {
    const userLogout = await KeyTokenService.findByUserId(userId);

    if (!userLogout) {
      clearCookieRefreshToken(res);
      return null;
    }

    clearCookieRefreshToken(res);
    await KeyTokenService.deleteKeyTokenById(userId);
    return null;
  }
}

module.exports = AccessService;
