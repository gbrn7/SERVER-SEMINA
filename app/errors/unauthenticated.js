// import http-status-codes
const { StatusCodes } = require('http-status-codes');
// import custom-api
const CustomAPIError = require('./custom-api-error');

class UauthenticatedError extends CustomAPIError {
  constructor(message) {
    super(message);
    // Give Status code
    this.statusCode = StatusCodes.UNAUTHORIZED;
  }
}
module.exports = UauthenticatedError;