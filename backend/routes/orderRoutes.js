const express = require('express');
const router = express.Router();
const Order = require('../models/Order');

// POST a new order (anyone can place an order — no password needed)
router.post('/', async (req, res) => {
  try {
    const { productId, productName, productPrice, productPhoto, buyerName, buyerPhone, buyerAddress, paymentMethod } = req.body;

    const newOrder = new Order({
      productId, productName, productPrice, productPhoto,
      buyerName, buyerPhone, buyerAddress,
      paymentMethod: paymentMethod === 'Easypaisa' ? 'Easypaisa' : 'COD',
    });
    await newOrder.save();
    res.status(201).json(newOrder);
  } catch (err) {
    res.status(500).json({ error: 'Could not place order' });
  }
});

// GET all orders — owner only, password sent as a query param
router.get('/', async (req, res) => {
  try {
    if (req.query.password !== process.env.OWNER_PASSWORD) {
      return res.status(401).json({ error: 'Wrong password' });
    }
    const orders = await Order.find().sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: 'Could not fetch orders' });
  }
});

// PATCH order status — owner only
router.patch('/:id', async (req, res) => {
  try {
    if (req.body.password !== process.env.OWNER_PASSWORD) {
      return res.status(401).json({ error: 'Wrong password' });
    }
    const updated = await Order.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: 'Could not update order' });
  }
});

module.exports = router;