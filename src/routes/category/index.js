"use strict";

const express = require("express");

const CategoryController = require("../../controllers/category.controller");
const asyncHandler = require("../../helpers/async-handler");
const { authentication } = require("../../utils/authUtils");

const router = express.Router();

router.get("/list", asyncHandler(CategoryController.listCategory));

router.use(authentication);

router.post("/create", asyncHandler(CategoryController.createCategory));
router.patch(
  "/update/:category_id",
  asyncHandler(CategoryController.updateCategory)
);
router.delete(
  "/delete/:category_id",
  asyncHandler(CategoryController.deleteCategory)
);

module.exports = router;
