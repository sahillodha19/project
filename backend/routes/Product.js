const express = require('express');
const Product = require('../database/Models/Products.js'); // Assuming the model for Account is in models/account.js
const router = express.Router();

// Create a new product 
router.post('/create', async (req, res) => {
  try {
    const { name, image, description, price, stock_quantity } = req.body;

    // Create a new user
    const newProduct = new Product({
      name,
      image,
      description,
      price,
      stock_quantity
    });

    await newProduct.save();
    res.status(201).json({ message: 'Product created successfully!' });
  } catch (error) {
    res.status(500).json({ message: 'Server error.' });
  }
});

router.get('/', async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json({ products: products });
  } catch (error) {
    res.status(500).json({ message: 'Server error.' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.status(200).json({ product: product });
  } catch (error) {
    res.status(500).json({ message: 'Server error.' });
  }
});


module.exports = router;

