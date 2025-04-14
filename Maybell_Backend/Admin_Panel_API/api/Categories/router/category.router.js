// Imports & Configs
const express = require("express");
const router = express.Router();
const CategoryController = require("../controller/category.controllers");

// Define Routes
router.post("/create", CategoryController.create);
router.post("/get-all", CategoryController.getAll);
router.post("/get-details/:id", CategoryController.getDetails);
router.put("/update/:id", CategoryController.update);
router.put("/update-status", CategoryController.updateStatus);
router.put("/delete", CategoryController.delete);
router.put("/delete-multiple", CategoryController.deleteMultiple);

// Export Router
module.exports = router;
