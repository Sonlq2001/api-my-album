"use strict";

const { Types } = require("mongoose");
const pick = require("lodash.pick");

const getInFoData = ({ fields = [], object = {} }) => {
  return pick(object, fields);
};

const convertToObjectIdMongodb = (id) => new Types.ObjectId(id);

const unGetSelectData = (select = []) => {
  return Object.fromEntries(select.map((item) => [item, 0]));
};

const getSelectData = (select = []) => {
  return Object.fromEntries(select.map((item) => [item, 1]));
};

const paginate = (page = 1, perPage = 20) => {
  const skip = (Number(page) - 1) * Number(perPage);
  return {
    skip,
    limit: perPage,
  };
};

module.exports = {
  getInFoData,
  convertToObjectIdMongodb,
  unGetSelectData,
  getSelectData,
  paginate,
};
