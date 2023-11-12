const AlbumModel = require("../../models/album.model");
const { unGetSelectData, convertToObjectIdMongodb } = require("../../utils");
const CategoryService = require("../../services/category.service");

const getAlbumDetail = async ({ slug, status, unSelect = [] }) => {
  const albumDetail = await AlbumModel.findOne({
    slug,
    status,
  })
    .populate({
      path: "user",
      select: "_id name email",
    })
    .select(unGetSelectData(unSelect))
    .lean();

  return albumDetail;
};

const getListAlbums = async ({ status, params }) => {
  const categoryDetail = await CategoryService.findBySlugCategory(
    params?.category
  );

  const conditionFind = categoryDetail
    ? {
        status,
        category: convertToObjectIdMongodb(categoryDetail._id),
      }
    : { status };

  return await AlbumModel.find(conditionFind)
    .populate({
      path: "category",
      select: "_id title slug",
    })
    .populate({
      path: "user",
      select: "_id name email",
    })
    .select(unGetSelectData(["__v", "status"]))
    .lean();
};

module.exports = {
  getAlbumDetail,
  getListAlbums,
};
