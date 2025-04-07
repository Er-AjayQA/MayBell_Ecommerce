// Imports & Configs
const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const cloudinary = require("../../../helpers/cloudinary");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const SlidersController = require("../controller/sliders.controllers");

// Config Cloudinary Storage
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "sliders",
    format: async (req, file) => "png" || "jpg" || "jpeg",
    public_id: (req, file) => {
      const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
      const extension = path.extname(file.originalname);
      return file.fieldname + "-" + uniqueSuffix + extension;
    },
  },
});

// Integrate Multer and Cloudinary
const sliderImage = multer({ storage: storage });

const singleImage = sliderImage.single("image");

// Define Routes
router.post("/create", singleImage, SlidersController.create);
router.post("/get-all", SlidersController.getAll);
router.post("/get-details/:id", SlidersController.getDetails);
router.put("/update/:id", singleImage, SlidersController.update);
router.put("/update-status", SlidersController.updateStatus);
router.post("/delete", SlidersController.delete);

// Export Router
module.exports = router;
