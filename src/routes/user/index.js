const express = require("express");

const UserController = require("../../controllers/user.controller");
const asyncHandler = require("../../helpers/async-handler");
const { authentication } = require("../../utils/authUtils");

const router = express.Router();

router.use(authentication);

router.patch("/:user_id/update", asyncHandler(UserController.updateUser));
router.get("", asyncHandler(UserController.getUser));

module.exports = router;
