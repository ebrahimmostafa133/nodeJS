const fs = require('fs');
const express = require('express');
const app = express();
const port = 6000;

app.get('/products', (req, res) => {
    console.log(req.query);
    const { category, quantity } = req.query;
    const productsData = fs.readFileSync('products.json');
    let products = JSON.parse(productsData);

    products = products.filter(p => {
        return (!category || p.category === category) &&
               (!quantity || p.quantity === Number(quantity));
    });

    res.json(products);
});


app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});