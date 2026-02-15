const express = require('express');
const {usersController} = require('../controllers');
const asyncWrapper = require('../helpers/asyncWrapper');

const router = express.Router();

router.post('/', async (req, res, next) => {
  const {body} = req;
  const [error, user] = await asyncWrapper(usersController.create(body));

  if (!error) return res.json(user);

  next(error);
});

router.get('/:id', (req, res) => {
  // call

  res.json();
});

router.post('/login', async (req, res) => {
  const {body} = req;
  const jwt = await usersController.login(body);
  res.json({jwt});
});

module.exports = router;
