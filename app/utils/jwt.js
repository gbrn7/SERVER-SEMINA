const jwt = require('jsonwebtoken');
//jsonwebtoken is used for make token within the declared time
const {jwtSecret, jwtExpiration} = require('../config');
//the line above is used for import the jwtsecret and time when the token is expired

 const createJWT = ({payload}) => {
  const token = jwt.sign(payload, jwtSecret, {
    expiresIn: jwtExpiration,
  })
  return token;
 }

 const crateRefreshJWT = ({payload}) => {
  const token = jwt.sign(payload, jwtRefreshTokenSecret, {
    expiresIn : jwtRefreshTokenExpiration,
  });
  return token;
 }

const isTokenValid = ({token}) => jwt.verify(token ,jwtSecret);

const isTokenValidRefreshToken = ({token}) => jwt.verify(token ,jwtRefreshTokenSecret);

module.exports = {
  createJWT,
  isTokenValid, 
  crateRefreshJWT,
  isTokenValidRefreshToken 
}

