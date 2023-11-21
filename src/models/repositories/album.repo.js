const AlbumModel = require("../../models/album.model");
const {
  unGetSelectData,
  getSelectData,
  convertToObjectIdMongodb,
  paginate,
} = require("../../utils");
const CategoryService = require("../../services/category.service");

const getConditionFindAlbums = async ({ status, slug, keyword }) => {
  const categoryDetail = await CategoryService.findBySlugCategory(slug);
  const regexSearch = new RegExp(keyword);

  const filterSearch = keyword ? { $text: { $search: regexSearch } } : {};

  const conditionFind = categoryDetail
    ? {
        status,
        category: convertToObjectIdMongodb(categoryDetail._id),
        ...filterSearch,
      }
    : {
        status,
        ...filterSearch,
      };

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
  const { page, per_page, keyword, sort = "-createdAt" } = params;

  const condition = await getConditionFindAlbums({
    status,
    slug: params?.cate,
    keyword,
  });

  const sortList = sort === "-createdAt" ? -1 : 1;

  const { skip, limit } = paginate(page, per_page);

  return await AlbumModel.find(
    condition,
    keyword ? { score: { $meta: "textScore" } } : null
  )
    .select(getSelectData(["title", "albums", "slug"]))
    .skip(skip)
    .limit(limit)
    .sort({ createdAt: sortList })
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
