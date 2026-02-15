const express = require('express');
const {usersController} = require('../controllers');
const asyncWrapper = require('../helpers/asyncWrapper');

const router = express.Router();

router.post('/', async (req, res, next) => {
  const {body} = req;
  const [error, user] = await asyncWrapper(usersController.create(body))
  if (!error) return res.json(user);
  return next(error)
});

module.exports = router;
