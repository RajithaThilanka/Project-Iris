const mongoose = require('mongoose');
const validator = require('validator');

const questionSchema = new mongoose.Schema({
  question: String,
  optionTags: [String],
  answerTags: [String],
  questionType: String,
});

const Question = mongoose.model('Question', questionSchema);
module.exports = Question;
