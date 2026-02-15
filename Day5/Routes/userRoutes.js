const express = require('express');
const { getUserProducts } = require('../Controllers/productControllers');

const router = express.Router();
const {
  createUser,
  getFirstName,
  deleteUser,
  updateUser,
} = require('../Controllers/userControllers');

router.post('/', createUser);
router.get('/', getFirstName);
router.get('/:id/products', getUserProducts);
router.patch('/:id', updateUser);
router.delete('/:id', deleteUser);

module.exports = router;
