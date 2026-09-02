const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  productId: { type: String },
  productName: { type: String, required: true },
  productPrice: { type: String, required: true },
  productPhoto: { type: String },

  buyerName: { type: String, required: true },
  buyerPhone: { type: String, required: true },
  buyerAddress: { type: String, required: true },

  deliveryCharge: { type: Number, default: 320 },
  paymentMethod: { type: String, enum: ['COD', 'Easypaisa'], default: 'COD' },

  status: { type: String, enum: ['Pending', 'Confirmed', 'Delivered'], default: 'Pending' },
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);