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

module.exports = {
  getInFoData,
  convertToObjectIdMongodb,
  unGetSelectData,
  getSelectData,
};
