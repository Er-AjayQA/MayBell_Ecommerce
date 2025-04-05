// Imports & Configs
const express = require("express");
const router = express.Router();
const DefaultController = require("../controller/default.controllers");

// Define Routes
router.post("/create", DefaultController.create);

// Export Router
module.exports = router;
