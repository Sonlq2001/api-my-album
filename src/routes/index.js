"use strict";

const express = require("express");

const router = express.Router();

router.use("/v1/api/bookmark", require("./bookmark"));
router.use("/v1/api/user", require("./user"));
router.use("/v1/api/category", require("./category"));
router.use("/v1/api/album", require("./album"));
router.use("/v1/api/upload", require("./upload"));
router.use("/v1/api", require("./access"));

module.exports = router;
