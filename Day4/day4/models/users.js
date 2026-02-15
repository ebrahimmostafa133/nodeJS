const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;

const usersSchema = new mongoose.Schema({
  username: {
    type: String,
    minLength: 5,
    maxLength: 20,
    required: true
  },
  email: {
    type: String,
    minLength: 5,
    maxLength: 20,
    required: true,
    validate(data){

    }
  },
  password: {
    type: String,
    required: true
  }
});

usersSchema.pre('save', function (_, input) {
  this.password = bcrypt.hashSync(this.password, saltRounds);
  return this;
});

const Users = mongoose.model('Users', usersSchema);


module.exports = Users;
