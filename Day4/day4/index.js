const process = require('node:process');
const express = require('express');
const mongoose = require('mongoose');

const routes = require('./routes');

mongoose.connect('mongodb://127.0.0.1:27017/osad46');

const app = express();
app.use(express.json());

app.use(routes);

app.use((req, res) => {
  res.sendStatus(404);
});

app.use((error, req, res, next) => {
  res.status(422).json({error: error.message})
})

const PORT = process.env.PORT || 3000;
app.listen(PORT, (error) => {
  if (error) {
    return console.log(error);
  }
  console.log(`Up and running: http://127.0.0.1:${PORT}`);
});
