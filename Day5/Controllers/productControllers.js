const Product = require('../Models/productModel');
const Users = require('../Models/userModel');

//create product
exports.createProduct = async (req, res) => {
  try {
    const { name, category, stockQuantity, user } = req.body;
    const product = await Product.create({
      name,
      category,
      stockQuantity,
      user,
    });
    await Users.findByIdAndUpdate(user, { $push: { products: product._id } }, { new: true });
    res.status(201).json({ success: true, data: product });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};
//get all products of specific user
exports.getUserProducts = async (req, res) => {
  try {
    const products = await Product.find({ user: req.params.id });
    res.status(200).json({ success: true, data: products });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
//update product
exports.patchProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found',
      });
    }
    if (product.user.toString() !== req.body.user) {
      return res.status(403).json({
        success: false,
        message: 'You are not authorized to update this product',
      });
    }
    Object.keys(req.body).forEach((key) => {
      product[key] = req.body[key];
    });
    await product.save();
    res.status(200).json({ success: true, data: product });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};
//delete product
exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found',
      });
    }
    if (product.user.toString() !== req.body.user) {
      return res.status(403).json({
        success: false,
        message: 'You are not authorized to delete this product',
      });
    }
    await Product.findByIdAndDelete(req.params.id);
    await Users.findByIdAndUpdate(product.user, { $pull: { products: product._id } });
    res.status(200).json({
      success: true,
      message: 'Product deleted successfully',
      data: product,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
//update stock
exports.updateStock = async (req, res) => {
  try {
    const { operation, quantity, user } = req.body;
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found',
      });
    }
    if (product.user.toString() !== user) {
      return res.status(403).json({
        success: false,
        message: 'You are not authorized to update stock for this product',
      });
    }
    if (operation === 'restock') {
      product.stockQuantity += quantity;
    } else if (operation === 'destock') {
      product.stockQuantity -= quantity;

      if (product.stockQuantity < 0) {
        return res.status(400).json({
          success: false,
          message: 'Insufficient stock to destock',
        });
      }
    } else {
      return res.status(400).json({
        success: false,
        message: 'Operation must be either "restock" or "destock"',
      });
    }

    await product.save();
    res.status(200).json({ success: true, data: product });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};
exports.getProducts = async (req, res) => {
  try {
    const { limit = 10, skip = 0, status } = req.query;
    const filter = {};
    if (status) {
      filter.status = status;
    }
    const products = await Product.find(filter).limit(parseInt(limit, 10)).skip(parseInt(skip, 10));
    const total = await Product.countDocuments(filter);

    res.status(200).json({
      success: true,
      count: products.length,
      total,
      data: products,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
