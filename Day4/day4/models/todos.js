const mongoose = require('mongoose');

const todosSchema = new mongoose.Schema({
  title: {
    type: String,
    minLength: 5,
    required: true
  },
  status: {
    type: String,
    enum: ['active', 'inactive'],
    default: 'inactive'
  },
  userId: {
    type: mongoose.Types.ObjectId,
    ref: 'Users'
  }
});

const Todos = mongoose.model('Todos', todosSchema);

module.exports = Todos;
