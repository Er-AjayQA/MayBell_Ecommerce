// Imports & Configs
const express = require("express");
const router = express.Router();
const DefaultController = require("../controller/default.controllers");

// Define Routes
router.post("/create", DefaultController.create);
router.post("/get-all", DefaultController.getAll);
router.post("/get-details/:id", DefaultController.getDetails);
router.put("/update/:id", DefaultController.update);
router.put("/update-status", DefaultController.updateStatus);
router.post("/delete", DefaultController.delete);

// Export Router
module.exports = router;
