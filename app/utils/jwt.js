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

const isTokenValid = ({token}) => jwt.verify(token ,jwtSecret);

module.exports = {
  createJWT,
  isTokenValid, 
}

