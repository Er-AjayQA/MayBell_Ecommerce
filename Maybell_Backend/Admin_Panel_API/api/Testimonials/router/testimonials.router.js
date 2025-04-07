// Imports & Configs
const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const cloudinary = require("../../../helpers/cloudinary");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const TestimonialsController = require("../controller/testimonials.controllers");

// Config Cloudinary Storage
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "testimonials",
    format: async (req, file) => "png" || "jpg" || "jpeg",
    public_id: (req, file) => {
      const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
      const extension = path.extname(file.originalname);
      return file.fieldname + "-" + uniqueSuffix + extension;
    },
  },
});

// Integrate Multer and Cloudinary
const testimonialImage = multer({ storage: storage });

const singleImage = testimonialImage.single("image");

// Define Routes
router.post("/create", singleImage, TestimonialsController.create);
router.post("/get-all", TestimonialsController.getAll);
router.post("/get-details/:id", TestimonialsController.getDetails);
router.put("/update/:id", singleImage, TestimonialsController.update);
router.put("/update-status", TestimonialsController.updateStatus);
router.post("/delete", TestimonialsController.delete);

// Export Router
module.exports = router;
