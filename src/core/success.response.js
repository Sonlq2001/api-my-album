"use strict";

class SuccessResponse {
  constructor({
    message,
    statusCode = 200,
    reasonStatusCode = 200,
    metadata = {},
    meta = {},
  }) {
    this.message = message ? message : reasonStatusCode;
    this.status = statusCode;
    this.metadata = metadata;
    this.meta = meta;
  }

  send(res, headers = {}) {
    return res.status(this.status).json(this);
  }
}

module.exports = SuccessResponse;
