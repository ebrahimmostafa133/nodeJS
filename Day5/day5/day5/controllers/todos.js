const {Todos} = require('../models');

const create = async (data) => {
  //
  const todo = await Todos.create(data);

  return todo;
};

module.exports = {
  create
};
