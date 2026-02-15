const { validationMiddlewarePost, validationMiddlewarePatch } = require('./middleware')
const express = require('express');
const products = require('./products');
const app = express();
const port = 3000;
const fs = require('fs');

app.use(express.json());

function saveProducts() {
  const jsonProducts = JSON.stringify(products, null, 2);
  fs.writeFileSync('./products.json', jsonProducts);
}

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/products', (req, res) => {
  res.json(products);
  console.log(products);
});

app.get('/products/:id', (req, res) => {
  const id = req.params.id;
  const product = products.find((p) => p.id === +id);
  if (product) {
    res.json(product);
  } else {
    res.status(404).send("Product not found please try another ID");
  }
});

app.post('/products', validationMiddlewarePost, (req, res) => {
  const { name, quantity, category } = req.body;
  const newProduct = {
    id: products.length + 1,
    name,
    quantity,
    category
  }
  products.push(newProduct);
  saveProducts();
  res.status(201).json(newProduct);
})

app.patch('/products/:id', validationMiddlewarePatch, (req, res) => {
  const id = req.params.id;
  const { name, quantity, category } = req.body;
  const product = products.find((p) => p.id === +id);
  if (product) {
    product.name = name || product.name;
    product.quantity = quantity || product.quantity;
    product.category = category || product.category;
    saveProducts();
    res.json(product);
  } else {
    res.status(404).send("Product not found please try another ID");
  }
})

app.patch('/products/:id/quantity/:quantity', (req, res) => {
  const id = req.params.id;
  const quantity = parseInt(req.params.quantity);
  const product = products.find((p) => p.id === +id);
  if (product) {
    if (quantity < 0 && Math.abs(quantity) > product.quantity) {
      return res.status(400).sendproduct.quantity += quantity;("You can't remove more than available quantity");
    }
    product.quantity += quantity;
    saveProducts();
    res.json(product);
  } else {
    res.status(404).send("Product not found please try another ID");
  }
})

app.delete('/products/:id', (req, res) => {
  const id = req.params.id;
  const product = products.find((p) => p.id === +id);
  if (product) {
    products.splice(products.indexOf(product), 1);
    saveProducts();
    res.json(product);
  } else {
    res.status(404).send("Product not found please try another ID");
  }
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

