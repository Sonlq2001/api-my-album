"use strict";

class SuccessResponse {
  constructor({
    message,
    statusCode = 200,
    reasonStatusCode = 200,
    metadata = {},
  }) {
    this.message = message ? message : reasonStatusCode;
    this.status = statusCode;
    this.metadata = metadata;
  }

  send(res, headers = {}) {
    return res.status(this.status).json(this);
  }
}

module.exports = SuccessResponse;
