const express = require("express");

const UserController = require("../../controllers/user.controller");
const asyncHandler = require("../../helpers/async-handler");

const router = express.Router();

router.patch("/:user_id/update", asyncHandler(UserController.updateUser));

module.exports = router;
