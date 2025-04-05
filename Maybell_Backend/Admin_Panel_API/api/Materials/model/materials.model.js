// Imports & Configs
const mongoose = require("mongoose");

// Define Materials Schema
const MaterialsSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
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
module.exports = mongoose.model("material", MaterialsSchema);
