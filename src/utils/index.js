"use strict";

const { Types } = require("mongoose");
const pick = require("lodash.pick");

const getInFoData = ({ fields = [], object = {} }) => {
  return pick(object, fields);
};

const convertToObjectIdMongodb = (id) => new Types.ObjectId(id);

const unGetSelectData = (unSelect = []) => {
  return Object.fromEntries(unSelect.map((item) => [item, 0]));
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

const removeUndefinedObject = (obj) => {
  Object.keys(obj).forEach((k) => {
    if (obj[k] === null || obj[k] === undefined) {
      delete obj[k];
    }
  });
  return obj;
};

const updateNestedObjectParser = (obj) => {
  const final = {};
  Object.keys(obj).forEach((k) => {
    if (typeof obj[k] === "object" && !Array.isArray(obj[k])) {
      const response = updateNestedObjectParser(obj[k]);
      Object.keys(response).forEach((a) => {
        final[`${k}.${a}`] = response[a];
      });
    } else {
      final[k] = obj[k];
    }
  });
  return final;
};

module.exports = {
  getInFoData,
  convertToObjectIdMongodb,
  unGetSelectData,
  getSelectData,
  paginate,
  removeUndefinedObject,
  updateNestedObjectParser,
};
