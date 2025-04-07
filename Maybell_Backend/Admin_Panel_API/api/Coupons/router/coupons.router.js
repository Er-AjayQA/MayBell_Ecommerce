// Imports & Configs
const express = require("express");
const router = express.Router();
const CouponsController = require("../controller/coupons.controllers");

// Define Routes
router.post("/create", CouponsController.create);
router.post("/get-all", CouponsController.getAll);
router.post("/get-details/:id", CouponsController.getDetails);
router.put("/update/:id", CouponsController.update);
router.put("/update-status", CouponsController.updateStatus);
router.post("/delete", CouponsController.delete);

// Export Router
module.exports = router;
