const Todo = require('../models/todos');

const createTodo = async (data) => {
  const todo = await Todo.create(data);
  return todo;
};

const findById = async (id) => {
  const todo = await Todo.findById(id)
  .populate('userId', 'username -_id')
  .exec();

  return todo
}

module.exports = {
  createTodo,
  findById
};
