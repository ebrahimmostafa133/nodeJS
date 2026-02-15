const express = require('express');
const {todosController} = require('../controllers');
const asyncWrapper = require('../helpers/asyncWrapper');
const authMiddleware = require('../middlewares/auth');

const router = express.Router();

router.post('/', authMiddleware, async (req, res, next) => {
  const {body} = req;
  const [error, todo] = await asyncWrapper(todosController.create({...body, userId: req.user._id}));

  if (!error) return res.json(todo);

  next(error);
});

module.exports = router;
