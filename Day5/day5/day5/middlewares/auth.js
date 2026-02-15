const jwt = require('jsonwebtoken');
const CustomError = require('../helpers/CustomError');
const {Users} = require('../models');

async function authMiddleware(req, res, next) {
  const {authorization} = req.headers;
  if (!authorization) throw new CustomError({statusCode: 401});

  const payload = jwt.verify(authorization, 'hjfytfsayr57623er623dfsss3d6723ert623dr');
  const user = await Users.findById(payload.userId).exec();
  req.user = user;

  next();
}

module.exports = authMiddleware;
