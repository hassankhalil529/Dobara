const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, default: 'Uncategorised' },
  price: { type: String, required: true },
  size: { type: String, default: '' },
  condition: { type: String, default: 'Good condition' },
  photo: { type: String, required: true }, // base64 image string
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);