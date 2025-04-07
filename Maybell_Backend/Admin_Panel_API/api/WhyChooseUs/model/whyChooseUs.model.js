// Imports & Configs
const mongoose = require("mongoose");

// Define Colors Schema
const WhyChooseUsSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true,
  },
  choose_order: {
    type: Number,
    unique: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
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
module.exports = mongoose.model("why_choose_us", WhyChooseUsSchema);
