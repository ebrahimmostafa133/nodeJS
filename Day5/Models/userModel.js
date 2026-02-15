const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const saltRounds = 10;
const usersSchema = new mongoose.Schema(
  {
    products: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        unique: true,
      },
    ],
    username: {
      type: String,
      required: [true, 'Username is required'],
      unique: true,
      minLength: [8, 'Username must be at least 8 characters long'],
    },
    firstName: {
      type: String,
      required: [true, 'First name is required'],
      minLength: [3, 'First name must be at least 3 characters long'],
      maxLength: [15, 'First name must be at most 15 characters long'],
    },
    lastName: {
      type: String,
      required: [true, 'Last name is required'],
      minLength: [3, 'Last name must be at least 3 characters long'],
      maxLength: [15, 'Last name must be at most 15 characters long'],
    },
    dob: {
      type: Date,
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
    },
  },
  { timestamps: true }
);

usersSchema.pre('save', async function () {
  if (!this.isModified('password')) return;
  this.password = await bcrypt.hash(this.password, saltRounds);
});

const Users = mongoose.model('users', usersSchema);
module.exports = Users;
