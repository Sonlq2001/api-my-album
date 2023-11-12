"use strict";

const CategoryService = require("../services/category.service");
const SuccessResponse = require("../core/success.response");

class CategoryController {
  static async createCategory(req, res) {
    new SuccessResponse({
      message: "Thêm thành công danh mục !",
      metadata: await CategoryService.createCategory(req.body),
    }).send(res);
  }

  static async listCategory(req, res) {
    new SuccessResponse({
      message: "Danh sách danh mục !",
      metadata: await CategoryService.listCategory(),
    }).send(res);
  }

  static async updateCategory(req, res) {
    new SuccessResponse({
      message: "Cập nhập thành công danh mục !",
      metadata: await CategoryService.updateCategory({
        ...req.body,
        categoryId: req.params.category_id,
      }),
    }).send(res);
  }

  static async deleteCategory(req, res) {
    new SuccessResponse({
      message: "Xóa thành công danh mục !",
      metadata: await CategoryService.deleteCategory(req.params.category_id),
    }).send(res);
  }
}

module.exports = CategoryController;
