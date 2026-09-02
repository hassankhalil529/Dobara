const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const productRoutes = require('./routes/productRoutes');
const orderRoutes = require('./routes/orderRoutes');
const app = express();

app.use(cors());
app.use(express.json({ limit: '10mb' })); // 10mb kyunke product photos base64 mein aayengi
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);

// MongoDB se connect
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected ✅'))
  .catch((err) => console.log('MongoDB connection error ❌', err));

// Test route
app.get('/', (req, res) => {
  res.send('Dobara backend is running');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});