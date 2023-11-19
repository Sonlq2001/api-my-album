const AlbumModel = require("../../models/album.model");
const {
  unGetSelectData,
  convertToObjectIdMongodb,
  paginate,
} = require("../../utils");
const CategoryService = require("../../services/category.service");

const getConditionFindAlbums = async ({ status, slug }) => {
  const categoryDetail = await CategoryService.findBySlugCategory(slug);

  const conditionFind = categoryDetail
    ? {
        status,
        category: convertToObjectIdMongodb(categoryDetail._id),
      }
    : { status };

  return conditionFind;
};

const getAlbumDetail = async ({ slug, status, unSelect = [] }) => {
  const albumDetail = await AlbumModel.findOne({
    slug,
    status,
  })
    .populate({
      path: "user",
      select: "_id name email",
    })
    .populate({
      path: "category",
      select: "_id title",
    })
    .select(unGetSelectData(unSelect))
    .lean();

  return albumDetail;
};

const getListAlbums = async ({ status, params }) => {
  const { page, per_page } = params;

  const condition = await getConditionFindAlbums({
    status,
    slug: params?.cate,
  });

  const { skip, limit } = paginate(page, per_page);

  return await AlbumModel.find(condition)
    .populate({
      path: "category",
      select: "_id title slug",
    })
    .populate({
      path: "user",
      select: "_id name email",
    })
    .select(unGetSelectData(["__v", "status"]))
    .skip(skip)
    .limit(limit)
    .lean();
};

const getCountAlbums = async ({ status, cate }) => {
  const condition = await getConditionFindAlbums({
    status,
    slug: cate,
  });
  return await AlbumModel.count(condition);
};

module.exports = {
  getAlbumDetail,
  getListAlbums,
  getCountAlbums,
};
