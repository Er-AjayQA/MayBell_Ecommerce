// Imports & Configs
const express = require("express");
const router = express.Router();
const multer = require("multer");
const cloudinary = require("../../../helpers/cloudinary");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const CategoryController = require("../controller/category.controllers");

// Configure Cloudinary storage for Multer

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "ecommerce/categories", // Your desired folder in Cloudinary
    allowed_formats: ["jpg", "jpeg", "png", "gif", "webp"], // Allowed file formats
    transformation: [{ width: 500, height: 500, crop: "limit" }], // Optional transformations
  },
});

const categoryImages = multer({ storage: storage });

const singleImage = categoryImages.single("categoryImage"); // This should match the frontend

// Define Routes
router.post("/create", singleImage, CategoryController.create);
router.post("/get-all", CategoryController.getAll);
router.post("/get-details/:id", CategoryController.getDetails);
router.put("/update/:id", singleImage, CategoryController.update);
router.put("/update-status", CategoryController.updateStatus);
router.put("/delete", CategoryController.delete);
router.put("/delete-multiple", CategoryController.deleteMultiple);

// Export Router
module.exports = router;
