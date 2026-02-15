const mongoose = require('mongoose');

const productsSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Product name is required'],
      unique: true,
      minLength: [3, 'Product name must be at least 3 characters long'],
    },
    price: {
      type: Number,
      min: [0, 'Product price must be a positive number'],
    },
    category: {
      type: String,
      required: [true, 'Product category is required'],
    },
    stockQuantity: {
      type: Number,
      required: [true, 'Stock quantity is required'],
      min: [0, 'Stock quantity must be a positive number'],
    },
    status: {
      type: String,
      enum: ['available', 'low stock', 'out of stock'],
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'User is required'],
    },
  },
  { timestamps: true }
);
productsSchema.pre('save', function (_, input) {
  if (this.stockQuantity > 2) {
    this.status = 'available';
  } else if (this.stockQuantity > 0) {
    this.status = 'low stock';
  } else {
    this.status = 'out of stock';
  }
  return input;
});
const Product = mongoose.model('Product', productsSchema);
module.exports = Product;
