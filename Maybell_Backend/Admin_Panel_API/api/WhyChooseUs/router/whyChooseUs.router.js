// Imports & Configs
const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const cloudinary = require("../../../helpers/cloudinary");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const ChooseController = require("../controller/whyChooseUs.controllers");

// Config Cloudinary Storage
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "why-choose-us",
    format: async (req, file) => "png" || "jpg" || "jpeg",
    public_id: (req, file) => {
      const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
      const extension = path.extname(file.originalname);
      return file.fieldname + "-" + uniqueSuffix + extension;
    },
  },
});

// Integrate Multer and Cloudinary
const whyChooseUsImage = multer({ storage: storage });

const singleImage = whyChooseUsImage.single("image");

// Define Routes
router.post("/create", singleImage, ChooseController.create);
router.post("/get-all", ChooseController.getAll);
router.post("/get-details/:id", ChooseController.getDetails);
router.put("/update/:id", singleImage, ChooseController.update);
router.put("/update-status", ChooseController.updateStatus);
router.post("/delete", ChooseController.delete);

// Export Router
module.exports = router;
