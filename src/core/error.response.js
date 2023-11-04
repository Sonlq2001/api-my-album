const { StatusCode, ReasonPhrases } = require("../utils/httpStatusCode");

class ErrorResponse extends Error {
  constructor(message, status) {
    super(message);
    this.status = status;
  }
}

class BadRequestError extends ErrorResponse {
  constructor(
    message = ReasonPhrases.BAD_REQUEST,
    statusCode = StatusCode.BAD_REQUEST
  ) {
    super(message, statusCode);
  }
}

class AuthFailureError extends ErrorResponse {
  constructor(
    message = ReasonPhrases.UNAUTHORIZED,
    statusCode = StatusCode.UNAUTHORIZED
  ) {
    super(message, statusCode);
  }
}

class ForbiddenError extends ErrorResponse {
  constructor(
    message = ReasonPhrases.FORBIDDEN,
    statusCode = StatusCode.FORBIDDEN
  ) {
    super(message, statusCode);
  }
}

class TimeoutError extends ErrorResponse {
  constructor(
    message = ReasonPhrases.REQUEST_TIMEOUT,
    statusCode = StatusCode.REQUEST_TIMEOUT
  ) {
    super(message, statusCode);
  }
}

module.exports = {
  BadRequestError,
  AuthFailureError,
  ForbiddenError,
  TimeoutError,
};
