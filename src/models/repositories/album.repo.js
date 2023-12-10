const AlbumModel = require("../../models/album.model");
const Bookmark = require("../../models/bookmark.model");

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

const getAlbumDetail = async ({ slug, userId, status, unSelect = [] }) => {
  const albumDetail = await AlbumModel.findOne({
    slug,
    status,
  })
    .populate({
      path: "user",
      select: "_id name email avatar",
    })
    .populate({
      path: "category",
      select: "_id title",
    })
    .select(unGetSelectData(unSelect))
    .lean();

  const isBookmark = await Bookmark.findOne({
    user: convertToObjectIdMongodb(userId),
    bookmarks: { $in: albumDetail._id },
  });

  return { ...albumDetail, is_bookmark: Boolean(isBookmark) };
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

  return {
    list: await AlbumModel.find(
      condition,
      keyword ? { score: { $meta: "textScore" } } : null
    )
      .select(getSelectData(["title", "albums", "slug"]))
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: sortList })
      .lean(),
    total: await AlbumModel.count(condition),
  };
};

module.exports = {
  getAlbumDetail,
  getListAlbums,
};
