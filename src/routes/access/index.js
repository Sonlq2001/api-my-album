"use strict";

const express = require("express");

const AccessController = require("../../controllers/access.controller");
const asyncHandler = require("../../helpers/async-handler");
const { authentication } = require("../../utils/authUtils");

const router = express.Router();

router.post("/login", asyncHandler(AccessController.login));
router.post("/sign_up", asyncHandler(AccessController.signUp));
router.post("/refresh_token", asyncHandler(AccessController.refreshToken));

router.use(authentication);

router.post("/logout", asyncHandler(AccessController.logout));

module.exports = router;
