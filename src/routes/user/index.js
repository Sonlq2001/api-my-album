const express = require("express");

const UserController = require("../../controllers/user.controller");
const asyncHandler = require("../../helpers/async-handler");
const { authentication } = require("../../utils/authUtils");

const router = express.Router();

router.get("/:slug_user/info", asyncHandler(UserController.getUserInfo));

router.use(authentication);

router.patch("/:user_id/update", asyncHandler(UserController.updateUser));
router.get("/:user_id", asyncHandler(UserController.getUser));

module.exports = router;
