const Answer = require('../models/answerModel');
const Question = require('../models/questionModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

exports.addQuestion = catchAsync(async (req, res, next) => {
  const { question, optionTags, questionType } = req.body;
  const newQuestion = await Question.create({
    question,
    optionTags,
    questionType,
  });

  res.status(200).json({
    status: 'success',
    data: {
      data: newQuestion,
    },
  });
});

exports.getAllQuestions = catchAsync(async (req, res, next) => {
  const questions = await Question.find({});
  res.status(200).json({
    status: 'success',
    data: {
      data: questions,
    },
  });
});

exports.updateQuestion = catchAsync(async (req, res, next) => {
  const updatedQuestion = await Question.findByIdAndUpdate(
    req.params.id,
    {
      ...req.body,
    },
    {
      new: true,
      runValidators: true,
    }
  );
  res.status(200).json({
    status: 'success',
    data: {
      data: updatedQuestion,
    },
  });
});

exports.deleteQuestion = catchAsync(async (req, res, next) => {
  await Question.findByIdAndDelete(req.params.id);
  res.status(200).json({
    status: 'success',
    data: {
      data: null,
    },
  });
});

exports.getQuestion = catchAsync(async (req, res, next) => {
  const question = await Question.findById(req.params.id);
  if (!question) {
    return next(new AppError('Question not found', 404));
  }
  res.status(200).json({
    status: 'success',
    data: {
      data: question,
    },
  });
});

exports.getQuestionArray = catchAsync( async (req, res, next) => {
  // Get a random sample of 3 items from the Question collection
  Question.aggregate([{ $sample: { size: 3 } }], (err, items) => {
    if (err) {
      return res.status(500).json({ error: err });
    }
    res.status(200).json({
    status: 'success',
    data: {
      data: items,
    },
    });
  });
});
