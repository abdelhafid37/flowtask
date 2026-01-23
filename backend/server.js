require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectToDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const taskRoutes = require("./routes/taskRoutes");
const errorHandler = require("./middleware/errorHandler");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(
  cors({
    origin: process.env.CLIENT_URL || "*",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);

app.use(express.json());

app.get("/", function (req, res) {
  res.send("Server is running...");
});

app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);

app.use(errorHandler);

(async function () {
  try {
    await connectToDB();
    console.log("Starting Server...");
    app.listen(PORT, function () {
      console.log("Server Running on Port", PORT);
    });
  } catch (error) {
    console.log("Server Failed to Start!");
    console.log("Error:", error);
  }
})();
