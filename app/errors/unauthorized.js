// import http-status-codes
const { StatusCodes } = require('http-status-codes');
// import custom-api
const CustomAPIError = require('./custom-api-error');

class Unauthorized extends CustomAPIError {
  constructor(message) {
    super(message);
    // Give Status code
    this.statusCode = StatusCodes.FORBIDDEN;
  }
}
module.exports = Unauthorized;