const express = require('express');
const morgan = require('morgan');
const productRouter = require('./Routes/productRoutes');
const userRouter = require('./Routes/userRoutes');

const app = express();
app.use(express.json());

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use('/api/v1/users', userRouter);
app.use('/api/v1/products', productRouter);
module.exports = app;
