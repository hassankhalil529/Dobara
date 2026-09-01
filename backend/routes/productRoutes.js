const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

// GET all products
router.get('/', async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: 'Could not fetch products' });
  }
});

// POST a new product
router.post('/', async (req, res) => {
  try {
    const { name, category, price, size, condition, photo, password } = req.body;

    // simple owner-password check
    if (password !== process.env.OWNER_PASSWORD) {
      return res.status(401).json({ error: 'Wrong password' });
    }

    const newProduct = new Product({ name, category, price, size, condition, photo });
    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (err) {
    res.status(500).json({ error: 'Could not add product' });
  }
});

// DELETE a product by id
router.delete('/:id', async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: 'Could not delete product' });
  }
});

module.exports = router;