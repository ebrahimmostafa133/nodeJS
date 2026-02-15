const express = require('express');
const app = express();
const port = 5000;
const products = require('./products');

app.set('view engine', 'pug');

app.get('/', (req, res) => {
    res.render('index', { title: 'Hey', message: 'Hello there!', products });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
