const express = require("express");
const cors = require("cors");
require("dotenv").config();

const ConnectDB = require("./src/db/db.js");
const route = require("./src/router/url.js");

const app = express();

ConnectDB();

// CORS - put this BEFORE your routes
app.use(cors());

app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    message: "URL Shortener API is running successfully 🚀"
  });
});

app.use("/url", route);

const PORT = process.env.PORT || 8080;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server is running on port ${PORT} 🚀`);
});