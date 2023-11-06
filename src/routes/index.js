"use strict";

const express = require("express");

const router = express.Router();

router.use("/v1", require("./access"));
router.use("/v1", require("./album"));
router.use("/v1", require("./upload"));

module.exports = router;
