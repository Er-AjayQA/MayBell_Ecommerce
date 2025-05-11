// Imports & Configs
const express = require("express");
const router = express.Router();
const multer = require("multer");
const upload = multer();
const BrandController = require("../controller/brands.controllers");

// Define Routes
router.post("/create", upload.none(), BrandController.create);
router.post("/get-all", BrandController.getAll);
router.post("/get-details/:id", BrandController.getDetails);
router.put("/update/:id", upload.none(), BrandController.update);
router.put("/update-status", BrandController.updateStatus);
router.put("/delete", BrandController.delete);
router.put("/delete-multiple", BrandController.deleteMultiple);

// Export Router
module.exports = router;
