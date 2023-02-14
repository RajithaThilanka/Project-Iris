const Answer = require('../models/answerModel');
const Question = require('../models/questionModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

exports.addAnswer = catchAsync(async (req, res, next) => {
  const userId = req.user._id;
  const { answerIndex } = req.body;

  let updatedAnswer;

  const answer = await Answer.findOne({
    userId,
    questions: {
      $in: [req.params.id],
    },
  });

  if (!answer) {
    return next(
      new AppError('You are not allowed to answer the question!', 401)
    );
  }

  const question = await Question.findById(req.params.id);
  if (!question) {
    return next(new AppError('Question not found', 404));
  }
  const tag = question.optionTags[answerIndex];
  const questionType = question.questionType;

  if (
    questionType === 'movies' ||
    questionType === 'music' ||
    questionType === 'socialMedia' ||
    questionType === 'sports'
  ) {
    updatedAnswer = await Answer.findOneAndUpdate(
      { userId },
      {
        $push: {
          [questionType]: tag,
        },
        $pull: {
          questions: req.params.id,
        },
      },
      {
        new: true,
        runValidators: true,
      }
    );
  } else if (questionType === 'politics') {
    updatedAnswer = await Answer.findOneAndUpdate(
      { userId },
      {
        [questionType]: tag,
        $pull: {
          questions: req.params.id,
        },
      }
    );
  } else if (questionType === 'profileDescription') {
    const updatedField = answer.profileDescription
      ? answer.profileDescription + ' ' + tag
      : tag;
    updatedAnswer = await Answer.findOneAndUpdate(
      {
        userId,
      },
      {
        profileDescription: updatedField,
        $pull: {
          questions: req.params.id,
        },
      },
      {
        new: true,
        runValidators: true,
      }
    );
  }

  res.status(200).json({
    status: 'success',
    data: {
      data: updatedAnswer,
    },
  });
});
