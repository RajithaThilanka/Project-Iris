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

//get all reports
// exports.getReports = catchAsync(async (req, res, next) => {
//   const features = new APIFeatures(Report.find({}), req.query).filter().sort();
//   const reports = await features.query
//     .populate('reportedByUser')
//     .populate('reportedUser');
//   //   let reports = await Report.find({})
//   //     .populate('reportedByUser')
//   //     .populate('reportedUser');

//   res.status(200).json({
//     status: 'success',
//     nReports: reports.length,
//     data: {
//       data: reports,
//     },
//   });
// });

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
