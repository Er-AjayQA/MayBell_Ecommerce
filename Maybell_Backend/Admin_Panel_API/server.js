// Imports & Configs
const express = require("express");
require("dotenv").config();
const app = express();
const cors = require("cors");
// const multer = require("multer");
const PORT = process.env.PORT || 5000;
const DBConnection = require("./config/db.config");

// Importing All Routes
const defaultRoutes = require("./api/default/router/default.router");
const materialsRoutes = require("./api/Materials/router/materials.router");
const colorsRoutes = require("./api/Colors/router/colors.router");
const adminsRoutes = require("./api/Admins/router/admin.router");
const categoryRoutes = require("./api/Categories/router/category.router");
const subCategoryRoutes = require("./api/SubCategory/router/subCategory.router");
const uomRoutes = require("./api/UOM/router/uom.router");

// Using Middlewares
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    methods: ["GET", "POST", "DELETE", "PUT"],
    allowedHeaders: ["Content-Type"],
  })
);

// app.use(multer().any()); // Handle multipart/form-data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes Middlewares
app.use("/api/v1/admin/default", defaultRoutes);
app.use("/api/v1/admin/materials", materialsRoutes);
app.use("/api/v1/admin/colors", colorsRoutes);
app.use("/api/v1/admin/categories", categoryRoutes);
app.use("/api/v1/admin/sub-categories", subCategoryRoutes);
app.use("/api/v1/admin/uom", uomRoutes);
app.use("/api/v1/admin/admin-user", adminsRoutes);

// Listening to Server
app.listen(PORT, (err) => {
  try {
    DBConnection(); // Connecting to DB
    if (!err) {
      console.log(`Server is running at port no :- ${PORT}`);
    }
  } catch (error) {
    console.log(`Server connection error`, err);
  }
});
