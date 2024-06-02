const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const authRoutes = require("./routes/auth");
const todoRoutes = require("./routes/todos");
const userRoutes = require("./routes/user");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/todos", todoRoutes);
app.use("/api", userRoutes);

const PORT = process.env.PORT || 5000;

console.log("Mongo URI:", process.env.MONGO_URI);
console.log("JWT Secret:", process.env.JWT_SECRET);

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("MongoDB connection error:", error);
    if (error.name === "MongoNetworkError") {
      console.error("Network-related error. Ensure IP whitelisting.");
    } else if (error.name === "MongooseServerSelectionError") {
      console.error(
        "Mongoose server selection error. Check your connection string and database status."
      );
    } else {
      console.error("Other error:", error);
    }
  });
