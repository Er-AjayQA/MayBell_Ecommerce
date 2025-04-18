// Imports & Configs
const express = require("express");
const router = express.Router();
const ColorsController = require("../controller/colors.controllers");

// Define Routes
router.post("/create", ColorsController.create);
router.post("/get-all", ColorsController.getAll);
router.post("/get-details/:id", ColorsController.getDetails);
router.put("/update/:id", ColorsController.update);
router.put("/update-status", ColorsController.updateStatus);
router.put("/delete", ColorsController.delete);
router.put("/delete-multiple", ColorsController.deleteMultiple);

// Export Router
module.exports = router;
