// Imports & Configs
const express = require("express");
const router = express.Router();
const multer = require("multer");
const upload = multer();

const UomController = require("../controller/uom.controllers");

// Define Routes
router.post("/create", upload.none(), UomController.create);
router.post("/get-all", UomController.getAll);
router.post("/get-details/:id", UomController.getDetails);
router.put("/update/:id", upload.none(), UomController.update);
router.put("/update-status", upload.none(), UomController.updateStatus);
router.put("/delete", UomController.delete);
router.put("/delete-multiple", UomController.deleteMultiple);

// Export Router
module.exports = router;
