"use strict";

const CategoryModel = require("../models/category.model");
const {
  getInFoData,
  getSelectData,
  convertToObjectIdMongodb,
} = require("../utils");

class CategoryController {
  static async createCategory(payload) {
    const newCategory = await CategoryModel.create(payload);
    return getInFoData({
      object: newCategory,
      fields: ["_id", "title", "slug"],
    });
  }

  static async listCategory() {
    const listCategory = await CategoryModel.find()
      .select(getSelectData(["_id", "title", "slug"]))
      .lean();
    return listCategory;
  }

  static async findBySlugCategory(slug) {
    const category = await CategoryModel.findOne({ slug })
      .select(getSelectData(["_id", "title", "slug"]))
      .lean();
    return category;
  }

  static async updateCategory({ categoryId, ...rest }) {
    const newCategoryUpdate = await CategoryModel.findByIdAndUpdate(
      convertToObjectIdMongodb(categoryId),
      rest,
      { new: true }
    ).select(getSelectData(["_id", "title", "slug"]));

    // update slug when update record
    newCategoryUpdate.title = rest.title;
    await newCategoryUpdate.save();

    return newCategoryUpdate;
  }

  static async deleteCategory(categoryId) {
    const categoryDeleted = await CategoryModel.findByIdAndDelete(
      convertToObjectIdMongodb(categoryId)
    )
      .select(getSelectData(["_id", "title"]))
      .lean();
    return categoryDeleted;
  }
}

module.exports = CategoryController;
