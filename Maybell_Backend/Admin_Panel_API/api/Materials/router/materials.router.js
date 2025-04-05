// Imports & Configs
const express = require("express");
const router = express.Router();
const MaterialsController = require("../controller/materials.controllers");

// Define Routes
router.post("/create", MaterialsController.create);
router.post("/get-all", MaterialsController.getAll);
router.post("/get-details/:id", MaterialsController.getDetails);
router.put("/update/:id", MaterialsController.update);
router.put("/update-status", MaterialsController.updateStatus);
router.post("/delete", MaterialsController.delete);

// Export Router
module.exports = router;
