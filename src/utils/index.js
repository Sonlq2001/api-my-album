"use strict";

const { Types } = require("mongoose");
const pick = require("lodash.pick");

const getInFoData = ({ fields = [], object = {} }) => {
  return pick(object, fields);
};

const convertToObjectIdMongodb = (id) => new Types.ObjectId(id);

module.exports = {
  getInFoData,
  convertToObjectIdMongodb,
};
