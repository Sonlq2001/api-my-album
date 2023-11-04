"use strict";

const snakeCase = require("lodash.snakecase");
const camelCase = require("lodash.camelcase");

const isArray = (d) => Array.isArray(d);

const isObject = (d) =>
  d === Object(d) && !isArray(d) && typeof d !== "function";

// convert object keys to snake_case
const toSnakeCase = (d, filter = false) => {
  if (d instanceof FormData) {
    return d;
  }

  if (isObject(d)) {
    const o = {};
    Object.keys(d).forEach((k) => {
      o[snakeCase(k)] = toSnakeCase(d[k], filter);
    });

    return o;
  }

  if (isArray(d)) {
    return d.map((o) => toSnakeCase(o, filter));
  }

  if (filter && d === "") {
    return null;
  }

  return d;
};

// convert object keys to camelCase
const toCamel = (d) => {
  if (isObject(d)) {
    const o = {};
    Object.keys(d).forEach((k) => {
      o[camelCase(k)] = toCamel(d[k]);
    });

    return o;
  }

  if (isArray(d)) {
    return d.map((o) => toCamel(o));
  }

  return d;
};

module.exports = { toSnakeCase, isObject, isArray, toCamel };
