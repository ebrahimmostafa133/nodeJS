const process = require('node:process');
const express = require('express');
const mongoose = require('mongoose');
const CustomError = require('./helpers/CustomError');

const app = express();
app.use(express.json());

mongoose.connect('mongodb://127.0.0.1:27017/osad46');

app.use(require('./routes'));

app.use((req, res) => {
  res.sendStatus(404);
});

app.use((err, req, res, next) => {
  if (err instanceof CustomError) {
    return res.status(err.statusCode).json({code: err.code, message: err.message});
  }
  console.error(err);
  res.status(500).json({error: err.message});
});

const PORT = process.env.PORT || '3000';
app.listen(PORT, (error) => {
  if (error) return console.log(`Error can't run server on port: ${PORT}`, error);
  console.log(`server up and running http://127.0.0.1:${PORT}`);
});
