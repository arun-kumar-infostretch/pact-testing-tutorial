const express = require('express');
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.json());


const products = {};

const stateHandlers = {
  'a product with ID 42 exists': () => {
    products['42'] = {
      id: 42,
      name: 'Super Widget',
      type: 'gadget',
    };
    return Promise.resolve('Product 42 created for test');
  },

  // --- ADD THE NEW STATE HANDLER ---
  'a product with ID 99 does not exist': () => {
    // For this state, we simply need to ensure product 99 is not in our database.
    // Since our teardown state clears the data, we don't need to do anything here.
    return Promise.resolve('Product 99 does not exist');
  },

  'the user is authenticated': () => {
    // For this state, we don't need to set up data.
    // We just need the state to exist so our API can check for a token.
    return Promise.resolve('User is authenticated for the test');
  },

  '': () => {
    Object.keys(products).forEach((key) => delete products[key]);
    return Promise.resolve('Data cleaned up');
  }
};

app.get('/products/:id', (req, res) => {
  const product = products[req.params.id];
  if (product) {
    res.json(product);
  } else {
    res.status(404).send();
  }
});

app.post('/products',(req,res)=>{
  if(!req.headers.authorization){
    return res.status(401).send('Unauthorized');
  }
  const newProduct = {
    id: Math.floor(Math.random() * 1000) + 1, // Simple random ID for demo purposes
    name: req.body.productName,
    type: req.body.productType,
  };
  products[newProduct.id] = newProduct;
  res.status(201).json(newProduct);
})

// This line is critical. It exports an object.
module.exports = { app, stateHandlers };