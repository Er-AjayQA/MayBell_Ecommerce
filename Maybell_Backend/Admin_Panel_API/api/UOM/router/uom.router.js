// Imports & Configs
const express = require("express");
const router = express.Router();

const UomController = require("../controller/uom.controllers");

// Define Routes
router.post("/create", UomController.create);
router.post("/get-all", UomController.getAll);
router.post("/get-details/:id", UomController.getDetails);
router.put("/update/:id", UomController.update);
router.put("/update-status", UomController.updateStatus);
router.put("/delete", UomController.delete);
router.put("/delete-multiple", UomController.deleteMultiple);

// Export Router
module.exports = router;
