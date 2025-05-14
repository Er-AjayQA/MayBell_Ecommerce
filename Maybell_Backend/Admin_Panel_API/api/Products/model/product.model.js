// Imports & Configs
const mongoose = require("mongoose");

// Define Product Schema
const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  slug: {
    type: String,
    default: "",
  },
  code: {
    type: String,
    default: "",
  },
  length: {
    type: String,
    default: "",
  },
  height: {
    type: String,
    default: "",
  },
  width: {
    type: String,
    default: "",
  },
  estimate_delivery_days: {
    type: String,
    default: "",
  },
  material_id: {
    type: Array,
    ref: "material",
    default: [],
  },
  color_id: {
    type: Array,
    ref: "color",
    default: [],
  },
  category_id: {
    type: String,
    required: true,
    ref: "category",
  },
  subCategory_id: {
    type: Array,
    default: [],
    ref: "subCategory",
  },
  image: {
    type: String,
    default: "",
  },
  images: {
    type: Array,
    default: [],
  },
  actual_price: {
    type: Number,
    default: "",
  },
  sale_price: {
    type: Number,
    default: "",
  },
  short_description: {
    type: String,
    default: "",
  },
  long_description: {
    type: String,
    default: "",
  },
  stock: {
    type: Number,
    default: 0,
  },
  isFeatured: {
    type: Boolean,
    default: false,
  },
  isOnSale: {
    type: Boolean,
    default: false,
  },
  isNewArrival: {
    type: Boolean,
    default: false,
  },
  isBestSelling: {
    type: Boolean,
    default: false,
  },
  isUpSell: {
    type: Boolean,
    default: false,
  },
  isTopRated: {
    type: Boolean,
    default: false,
  },
  order: {
    type: Number,
    min: 1,
    max: 10000,
    default: 1,
  },
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
module.exports = mongoose.model("product", ProductSchema);
