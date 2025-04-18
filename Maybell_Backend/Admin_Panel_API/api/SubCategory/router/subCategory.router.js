// Imports & Configs
const express = require("express");
const router = express.Router();
const multer = require("multer");
const cloudinary = require("../../../helpers/cloudinary");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const SubCategoryController = require("../controller/subCategory.controllers");

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

const singleImage = categoryImages.single("categoryImage");

// Define Routes
router.post("/create", singleImage, SubCategoryController.create);
router.post("/get-all", SubCategoryController.getAll);
router.post("/get-details/:id", SubCategoryController.getDetails);
router.put("/update/:id", singleImage, SubCategoryController.update);
router.put("/update-status", SubCategoryController.updateStatus);
router.put("/delete", SubCategoryController.delete);
router.put("/delete-multiple", SubCategoryController.deleteMultiple);

// Export Router
module.exports = router;
