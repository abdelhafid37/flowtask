const mongoose = require("mongoose");

async function connectToDB() {
  try {
    console.log("Connecting to Database...");
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Database Connected Successfully.");
  } catch (error) {
    console.log("Database Connection Failed!");
    console.log("Connection Error:", error);
    process.exit(1);
  }
}

module.exports = connectToDB;
