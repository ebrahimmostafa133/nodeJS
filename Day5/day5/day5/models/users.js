const process = require('node:process');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

const usersSchema = new mongoose.Schema({
  username: {
    type: String,
    minLength: 5,
    maxLength: 20,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  email: String
});

usersSchema.pre('save', function () {
  this.password = bcrypt.hashSync(this.password, 10);
});

usersSchema.set('toJSON', {
  transform: (doc, {__v, password, ...rest}, options) => rest
});

usersSchema.methods.verifyPassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};

const JWT_SECRET = process.env.JWT_SECRET || 'hjfytfsayr57623er623dfsss3d6723ert623dr';

usersSchema.methods.generateJwt = function () {
  return jwt.sign({userId: this._id, email: this.email}, JWT_SECRET, {expiresIn: '1d'});
};

const Users = mongoose.model('Users', usersSchema);

module.exports = Users;
