const Report = require('../models/reportModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const { genderateRandom, generateRandom } = require('../utils/utilFuncs');
const Admin = require('../models/adminModel');
const APIFeatures = require('../utils/apiFeatures');

exports.reportUser = catchAsync(async (req, res, next) => {
  const { reportedUser, reason } = req.body;
  const admins = await Admin.find({});
  const adminId = admins[generateRandom(0, admins.length)]._id;

  let newReport = await Report.create({
    reportedByUser: req.user._id,
    reportedUser,
    reason,
    adminId,
  });
  newReport = await newReport
    .populate('reportedByUser')
    .populate('reportedUser')
    .execPopulate();

  res.status(200).json({
    status: 'success',
    data: {
      data: newReport,
    },
  });
});

exports.getReports = catchAsync(async (req, res, next) => {
  const features = new APIFeatures(Report.find({}), req.query).filter().sort();
  const reports = await features.query
    .populate('reportedByUser')
    .populate('reportedUser');
  //   let reports = await Report.find({})
  //     .populate('reportedByUser')
  //     .populate('reportedUser');

  res.status(200).json({
    status: 'success',
    nReports: reports.length,
    data: {
      data: reports,
    },
  });
});

exports.fetchWarnings = catchAsync(async (req, res, next) => {
  const userId = req.user._id;
  const reportWarnings = await Report.find({
    $and: [
      { reportedUser: userId },
      { reviewStatus: 'positive' },
      { userNotified: false },
      { updatedAt: { $gt: Date.now() - 1 * 24 * 60 * 60 * 1000 } },
    ],
  })
    .populate('reportedByUser')
    .populate('reportedUser');
  await Report.updateMany(
    {
      $and: [
        { reportedUser: userId },
        { reviewStatus: 'positive' },
        { userNotified: false },
        { updatedAt: { $gt: Date.now() - 1 * 24 * 60 * 60 * 1000 } },
      ],
    },
    {
      userNotified: true,
    }
  );
  res.status(200).json({
    status: 'success',
    nReports: reportWarnings.length,
    data: {
      data: reportWarnings,
    },
  });
});

// exports.getReports = catchAsync(async (req, res, next) => {
//   let reports = await Report.find({})
//     .populate('reportedByUser')
//     .populate('reportedUser');

//   res.status(200).json({
//     status: 'success',
//     data: {
//       data: reports,
//     },
//   });
// });

// exports.getReportsForAdmin = catchAsync(async (req, res, next) => {
//   const { adminId } = req.body;
//   let reports = await Report.find({
//     $and: [
//       { adminId },
//       {
//         reviewStatus: 'pending',
//       },
//     ],
//   })
//     .populate('reportedByUser')
//     .populate('reportedUser');

//   res.status(200).json({
//     status: 'success',
//     data: {
//       data: reports,
//     },
//   });
// });

exports.reviewReport = catchAsync(async (req, res, next) => {
  const { reportId, reviewStatus } = req.body;
  const updatedReport = await Report.findByIdAndUpdate(reportId, {
    reviewStatus: reviewStatus,
  })
    .populate('reportedByUser')
    .populate('reportedUser');

  res.status(200).json({
    status: 'success',
    data: {
      data: updatedReport,
    },
  });
});
