const jwt = require('jsonwebtoken');
const {jwtSecret, jwtExpiration} = require('../config');

 const createJWT = ({payload}) => {
  const token = jwt.sign(payload, jwtSecret, {
    expiresIn: jwtExpiration,
  })
 }

const isTokenValid = ({token}) => jwt.verify(Token ,jwtSecret);

module.exports = {
  createJWT,
  isTokenValid,
}

