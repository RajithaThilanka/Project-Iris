const mongoose = require('mongoose');
const validator = require('validator');
const Question = require('./questionModel');

const answerSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  questions: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'Question',
  },
  movies: [String],
  music: [String],
  politics: String,
  socialMedia: [String],
  sports: [String],
  profileDescription: {
    type: String,
    default: '',
  },
});

const Answer = mongoose.model('Answer', answerSchema);
module.exports = Answer;
