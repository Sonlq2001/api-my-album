"use strict";

const JWT = require("jsonwebtoken");

const {
  BadRequestError,
  AuthFailureError,
  TimeoutError,
} = require("../core/error.response");
const KeyTokenService = require("../services/key-token.service");
const asyncHandler = require("../helpers/async-handler");
const { KEY_TOKEN } = require("../constants/token.constants");

const HEADER = {
  API_KEY: "x-api-key",
  CLIENT_ID: "x-client-id",
  AUTHORIZATION: "authorization",
};

const verifyJWT = async ({
  token,
  keySecret,
  key = KEY_TOKEN.TOKEN,
  userId,
}) => {
  try {
    return JWT.verify(token, keySecret);
  } catch (error) {
    if (error.name === "TokenExpiredError" && key === KEY_TOKEN.TOKEN) {
      throw new TimeoutError("Phiên token đã hết hạn !");
    }
    await KeyTokenService.deleteKeyTokenById(userId); // remove key store when refresh token expired
    throw new AuthFailureError("expired_refresh_token");
  }
};

const createTokenPair = (payload, publicKey, privateKey) => {
  try {
    const accessToken = JWT.sign(payload, publicKey, {
      expiresIn: "30m",
    });
    const refreshToken = JWT.sign(payload, privateKey, {
      expiresIn: "1h",
    });

    JWT.verify(accessToken, publicKey, (err) => {
      if (err) {
        throw new BadRequestError("Không thể xác thực !");
      }
    });

    return { accessToken, refreshToken };
  } catch (error) {
    throw new BadRequestError(error);
  }
};

const authentication = asyncHandler(async (req, res, next) => {
  const clientId = req.headers[HEADER.CLIENT_ID];
  if (!clientId) {
    throw new BadRequestError("Không thể xác thực người dùng !");
  }

  const keyStore = await KeyTokenService.findByUserId(clientId);

  if (!keyStore) {
    throw new BadRequestError("Yêu cầu không hợp lệ !");
  }

  const tokenHeader = req.headers[HEADER.AUTHORIZATION];
  const token = tokenHeader?.split(" ")?.[1];

  if (!token) {
    throw new BadRequestError("Không thể xác thực !");
  }

  const decodeUser = await verifyJWT({ token, keySecret: keyStore.public_key });

  if (decodeUser.userId !== clientId) {
    throw new BadRequestError("UserId không tồn tại !");
  }

  req.keyStore = keyStore;
  req.user = decodeUser;
  next();
});

const clearCookieRefreshToken = (res) => {
  res.clearCookie("refresh_token", {
    httpOnly: true,
    sameSite: "None",
    secure: true,
  });
};

const setCookieRefreshToken = (res, refreshToken) => {
  res.cookie("refresh_token", refreshToken, {
    httpOnly: true,
    maxAge: 1000 * 60 * 60 * 24, // 1day
    secure: true,
    sameSite: "None",
  });
};

module.exports = {
  createTokenPair,
  authentication,
  verifyJWT,
  clearCookieRefreshToken,
  setCookieRefreshToken,
};
