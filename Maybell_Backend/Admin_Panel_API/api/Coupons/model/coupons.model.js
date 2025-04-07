// Imports & Configs
const mongoose = require("mongoose");

// Define Materials Schema
const CouponsSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  code: {
    type: String,
    required: true,
    unique: true,
  },
  start_date: {
    type: Date,
    required: true,
  },
  end_date: {
    type: Date,
  },
  start_price: {
    type: Number,
    required: true,
  },
  end_price: {
    type: Number,
  },
  discount: {
    type: Number,
  },
  order: { type: Number, min: 0, max: 10000, default: 0, unique: true },
  status: {
    type: Boolean,
    default: true,
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
  updatedAt: {
    type: Date,
    default: new Date(),
  },
  deletedAt: {
    type: Date,
    default: null,
  },
});

// Create And Export Model
module.exports = mongoose.model("coupon", CouponsSchema);
