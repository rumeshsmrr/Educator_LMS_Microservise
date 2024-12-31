const express = require("express");
require("dotenv").config();
const bodyParser = require("body-parser");
const cors = require("cors");

//import routes
const paymentRoutes = require("./routes/PaymentRoute");

// MongoDB connection
require("./config/db");

const app = express();
app.use(cors());

// Define your routes and middleware here
// app.use(express.json());
app.use(bodyParser.json());

// Use the payment routes
app.use("/payment", paymentRoutes);

port = process.env.PORT || 8006;
app.listen(port, () => {
  console.log(`payment service is running on port ${port}`);
});
app.get("/payment", (req, res) => {
  res.send("Hello, World!");
});
