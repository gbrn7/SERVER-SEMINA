const Users = require('../../api/v1/users/model');
const { BadRequestError, Unauthorized } = require('../../errors/index');
const { createTokenUser, createJWT, createRefreshJWT } = require('../../utils');
const { createUserRefreshToken } = require('./refreshToken');

const signin = async (req) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new BadRequestError("please provide the email and password");
  }

  const result = await Users.findOne({ email });

  if (!result) {
    throw new BadRequestError("Invalid Credentials");
  }

  const isPasswordValid = await result.comparePassword(password);
  //the above line is return the boolean from compare password function model

  if (!isPasswordValid) {
    throw new Unauthorized('Invalid Credentials');
  }

  const token = createJWT({ payload: createTokenUser(result) });

  const refreshToken = createRefreshJWT({ payload: createTokenUser(result) });

  await createUserRefreshToken({
    refreshToken,
    user: result._id,
  });

  return { token, refreshToken, role: result.role, email: result.email };
}

module.exports = { signin };