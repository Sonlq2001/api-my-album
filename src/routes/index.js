"use strict";

const express = require("express");

const router = express.Router();

router.use("/v1", require("./access"));
router.use("/v1", require("./album"));

module.exports = router;
