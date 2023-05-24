const Review = require('../models/reviewModel');
const User = require('../models/userModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

exports.addReview = catchAsync(async (req, res, next) => {
  const reviewer = req.user._id;
  const { description, rating, highlight } = req.body;

  try {
    let newReview = await Review.create({
      userId: reviewer,
      description,
      rating,
      highlight,
    });
    res.status(200).json({
      status: 'success',
      data: {
        data: newReview,
      },
    });
  } catch (err) {
    return next(new AppError('Something went wrong!', 500));
  }
});

// get all reviews
exports.getReviews = catchAsync(async (req, res, next) => {
  let reviews = await Review.find({}).populate('userId').limit(3);

  res.status(200).json({
    status: 'success',
    data: {
      data: reviews,
    },
  });
});

// exports.reviewReport = catchAsync(async (req, res, next) => {
//   const { reportId, reviewStatus } = req.body;
//   const updatedReport = await Report.findByIdAndUpdate(reportId, {
//     reviewStatus: reviewStatus,
//   })
//     .populate('reportedByUser')
//     .populate('reportedUser');

//   res.status(200).json({
//     status: 'success',
//     data: {
//       data: updatedReport,
//     },
//   });
// });
