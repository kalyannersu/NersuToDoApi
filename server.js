const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const logger = require("./utils/logger");

const authRoutes = require("./routes/auth");
const todoRoutes = require("./routes/todos");
const userRoutes = require("./routes/user");
const questionRoutes = require("./routes/questions");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/todos", todoRoutes);
app.use("/api", userRoutes);
app.use("/api", questionRoutes);

const PORT = process.env.PORT || 5000;

logger.info("Mongo URI:", process.env.MONGO_URI);
logger.info("JWT Secret:", process.env.JWT_SECRET);

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => {
      logger.info(`Server running on port ${PORT}`);
    });
  })
  .catch((error) => {
    logger.error("MongoDB connection error:", error);
    if (error.name === "MongoNetworkError") {
      logger.error("Network-related error. Ensure IP whitelisting.");
    } else if (error.name === "MongooseServerSelectionError") {
      logger.error(
        "Mongoose server selection error. Check your connection string and database status."
      );
    } else {
      logger.error("Other error:", error);
    }
  });
