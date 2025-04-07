// Imports & Configs
const mongoose = require("mongoose");

// Define Colors Schema
const AdminsSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  mobile: { type: Number, minlength: 10, maxlength: 10, unique: true },
  status: {
    type: Boolean,
    default: true,
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
module.exports = mongoose.model("admin", AdminsSchema);
