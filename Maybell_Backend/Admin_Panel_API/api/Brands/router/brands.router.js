// Imports & Configs
const express = require("express");
const router = express.Router();
const multer = require("multer");
const cloudinary = require("../../../helpers/cloudinary");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const BrandController = require("../controller/brands.controllers");

// Configure Cloudinary storage for Multer

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "ecommerce/brands", // Your desired folder in Cloudinary
    allowed_formats: ["jpg", "jpeg", "png", "gif", "webp"], // Allowed file formats
    transformation: [{ width: 500, height: 500, crop: "limit" }], // Optional transformations
  },
});

const brandLogo = multer({ storage: storage });

const singleImage = brandLogo.single("logo"); // This should match the frontend

// Define Routes
router.post("/create", singleImage, BrandController.create);
router.post("/get-all", BrandController.getAll);
router.post("/get-details/:id", BrandController.getDetails);
router.put("/update/:id", singleImage, BrandController.update);
router.put("/update-status", BrandController.updateStatus);
router.put("/delete", BrandController.delete);
router.put("/delete-multiple", BrandController.deleteMultiple);

// Export Router
module.exports = router;
