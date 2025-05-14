// Imports & Configs
const express = require("express");
const router = express.Router();
const multer = require("multer");
const cloudinary = require("../../../helpers/cloudinary");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const ProductController = require("../controller/product.controllers");

// Configure Cloudinary storage for Multer

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "ecommerce/products", // Your desired folder in Cloudinary
    allowed_formats: ["jpg", "jpeg", "png", "gif", "webp"], // Allowed file formats
    transformation: [{ width: 500, height: 500, crop: "limit" }], // Optional transformations
  },
});

const multerImage = multer({ storage: storage });

const cUpload = multerImage.fields([
  { name: "image", maxCount: 1 },
  { name: "images", maxCount: 12 },
]);

// Define Routes
router.post("/create", cUpload, ProductController.create);
router.post("/get-all", ProductController.getAll);
router.post("/get-details/:id", ProductController.getDetails);
router.put("/update/:id", cUpload, ProductController.update);
router.put("/update-status", ProductController.updateStatus);
router.put("/delete", ProductController.delete);
router.put("/delete-multiple", ProductController.deleteMultiple);

// Export Router
module.exports = router;
