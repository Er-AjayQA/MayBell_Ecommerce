// Imports & Configs
const express = require("express");
require("dotenv").config();
const app = express();
const PORT = process.env.PORT || 5000;
const DBConnection = require("./config/db.config");

// Importing All Routes
const defaultRoutes = require("./api/default/router/default.router");

// Using Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes Middlewares
app.use("/v1/api/default", defaultRoutes);

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
