const express = require('express');

const router = express.Router();
const {
  createProduct,
  patchProduct,
  deleteProduct,
  updateStock,
  getProducts,
} = require('../Controllers/productControllers');

router.post('/', createProduct);
router.get('/', getProducts);
router.patch('/:id', patchProduct);
router.delete('/:id', deleteProduct);
router.patch('/:id/stock', updateStock);

module.exports = router;
