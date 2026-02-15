const mongoose = require('mongoose');

const todosSchema = new mongoose.Schema({
  title: String,
  status: {
    type: String,
    enum: ['pending', 'active']
  },
  userId: {
    type: mongoose.Types.ObjectId,
    ref: 'Users'
  }
});

const Todos = mongoose.model('Todos', todosSchema);

module.exports = Todos;
