const express = require('express');
const {todosController} = require('../controllers');

const router = express.Router();

router.post('/', async (req, res) => {
  const {body} = req;
  const todo = await todosController.createTodo(body);
  res.json(todo);
});

router.get('/:id', async (req, res) => {
  const {id} =  req.params;
  const todo = await todosController.findById(id)
  res.json(todo);
});

module.exports = router;
