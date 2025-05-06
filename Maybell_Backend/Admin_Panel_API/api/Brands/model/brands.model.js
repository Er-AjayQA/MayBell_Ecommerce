// Imports & Configs
const mongoose = require("mongoose");

// Define Category Schema
const BrandSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  slug: {
    type: String,
    default: "",
  },
  logo: { type: String, default: "" },
  order: { type: Number, min: 1, max: 10000, default: 1 },
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
module.exports = mongoose.model("category", BrandSchema);
