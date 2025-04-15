// Imports & Configs
const mongoose = require("mongoose");

// Define Category Schema
const CategorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  category_img: { type: String },
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
module.exports = mongoose.model("category", CategorySchema);
