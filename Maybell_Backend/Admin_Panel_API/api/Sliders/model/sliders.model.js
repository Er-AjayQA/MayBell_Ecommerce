// Imports & Configs
const mongoose = require("mongoose");

// Define Colors Schema
const SlidersSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true,
  },
  slider_order: {
    type: Number,
    required: true,
    unique: true,
  },
  image: {
    type: String,
  },
  order: { type: Number, min: 0, max: 10000, default: 0 },
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
module.exports = mongoose.model("slider", SlidersSchema);
