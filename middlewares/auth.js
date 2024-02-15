const jsonWebToken = require('jsonwebtoken');

const CustomError = require('../errors/customError');

function auth(req, res, next) {
  const { authorization } = req.headers;

  if (!authorization) {
    return next(new CustomError('unautharized', 401));
  }
  const valid = jsonWebToken.verify(authorization, 'asdfghjkl1qwedfvgb');

  if (!valid) {
    return next(new CustomError('unautharized', 401));
  }
  req.userId = valid.id;
  return next();
}
module.exports = {
  auth,
};
