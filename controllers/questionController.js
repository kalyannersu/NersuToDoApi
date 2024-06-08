const Question = require("../models/Question");
const handleError = require("../utils/handleError");
const handleSuccess = require("../utils/handleSuccess");
const logger = require("../utils/logger");

const getQuestions = (req, res) => {
  Question.find()
    .then((questions) => handleSuccess(res, questions))
    .catch((err) => handleError(res, err));
};

const createQuestion = (req, res) => {
  const { title, description } = req.body;

  const question = new Question({ title, description });

  question
    .save()
    .then((newQuestion) => handleSuccess(res, newQuestion, 201))
    .catch((err) => handleError(res, err, 400));
};

const deleteQuestion = (req, res) => {
  Question.findByIdAndDelete(req.params.id)
    .then((question) => {
      if (!question) {
        return handleError(res, new Error("Question not found"), 404);
      }
      handleSuccess(res, { message: "Question deleted" });
    })
    .catch((err) => handleError(res, err));
};

const updateQuestion = (req, res) => {
  const { title, description } = req.body;

  Question.findById(req.params.id)
    .then((question) => {
      if (!question) {
        return handleError(res, new Error("Question not found"), 404);
      }

      if (title) question.title = title;
      if (description) question.description = description;

      return question.save();
    })
    .then((updatedQuestion) => handleSuccess(res, updatedQuestion))
    .catch((err) => handleError(res, err));
};

module.exports = {
  getQuestions,
  createQuestion,
  deleteQuestion,
  updateQuestion,
};
