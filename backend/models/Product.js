const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, default: 'Uncategorised' },
  price: { type: String, required: true },
  size: { type: String, default: '' },
  condition: { type: String, default: 'Good condition' },
  photos: { type: [String], required: true }, // array of base64 image strings
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);