const CustomError = require('../helpers/CustomError');
const {Users} = require('../models');

const create = async (data) => {
  const user = await Users.create(data);

  return user;
};

const login = async (data) => {
  const user = await Users.findOne({email: data.email}).exec();

  if (!user) throw new CustomError({statusCode: 401, code: 'AUTH_ERROR', message: 'User name or passowrd is not correct'});

  const isValidPassword = user.verifyPassword(data.password);
  if (!isValidPassword) throw new CustomError({statusCode: 401, code: 'AUTH_ERROR', message: 'User name or passowrd is not correct'});
  const jwt = user.generateJwt();

  return jwt;
};

module.exports = {
  create,
  login
};
