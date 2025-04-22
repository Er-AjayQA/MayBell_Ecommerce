// Imports & Configs
const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const upload = multer({ dest: "uploads/categories" });
const CategoryController = require("../controller/category.controllers");

// Configure storage for Multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/categories");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(
      null,
      file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname)
    );
  },
});

const multerImage = multer({ storage: storage });

var singleImage = multerImage.single("image");

// Define Routes
router.post("/create", singleImage, CategoryController.create);
router.post("/get-all", upload.none(), CategoryController.getAll);
router.post("/get-details/:id", upload.none(), CategoryController.getDetails);
router.put("/update/:id", singleImage, CategoryController.update);
router.put("/update-status", upload.none(), CategoryController.updateStatus);
router.put("/delete", upload.none(), CategoryController.delete);
router.put(
  "/delete-multiple",
  upload.none(),
  CategoryController.deleteMultiple
);

// Export Router
module.exports = router;
