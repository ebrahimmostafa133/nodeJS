const Users = require('../models/users');

const create = async (data) => {
  const user = await Users.create(data);
  return user;
};

module.exports = {
  create
};
