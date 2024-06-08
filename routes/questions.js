const express = require("express");

const {
  getQuestions,
  createQuestion,
  updateQuestion,
  deleteQuestion,
} = require("../controllers/questionController");

const authMiddleware = require("../middleware/authMiddleware");
const router = express.Router();

router.get("/fetchQuestions", authMiddleware, getQuestions);
router.post("/createQuestion", authMiddleware, createQuestion);
router.delete("/deleteQuestion/:id", authMiddleware, deleteQuestion);
router.put("/updateQuestion/:id", authMiddleware, updateQuestion);

module.exports = router;
