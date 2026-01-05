require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectToDB = require("./config/db");
const authRouter = require("./routes/authRoutes");

const app = express();

app.use(
  cors({
    origin: process.env.CLIENT_URL || "*",
    methods: ["GET", "POST", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use(express.json());

app.get("/", function (req, res) {
  res.send("Server is running...");
});

app.use("/api/auth", authRouter);

(async function () {
  try {
    await connectToDB();
    console.log("Starting Server...");
    app.listen(process.env.PORT, function () {
      console.log("Server Running on Port", process.env.PORT);
    });
  } catch (error) {
    console.log("Server Failed to Start!");
    console.log("Error:", error);
  }
})();
