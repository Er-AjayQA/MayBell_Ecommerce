// Imports & Configs
const express = require("express");
const router = express.Router();
const AdminsController = require("../controller/admin.controllers");

// Define Routes
router.post("/create", AdminsController.create);
router.post("/get-all", AdminsController.getAll);
router.post("/get-details/:id", AdminsController.getDetails);
router.put("/update/:id", AdminsController.update);
router.put("/update-status", AdminsController.updateStatus);
router.post("/delete", AdminsController.delete);

// Export Router
module.exports = router;
