const Settings = require('../models/settingsModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const fs = require('fs');

//schedule hate speech
exports.scheduleHatespeech = catchAsync(async (req, res, next) => {
  const { hateSpeechScheduledAt } = req.body;

  let setting = await Settings.findOne({});
  if (!setting) {
    setting = await Settings.create({
      hateSpeechScheduledAt,
    });
  } else {
    setting.hateSpeechScheduledAt = hateSpeechScheduledAt;
    await setting.save();
  }

  const updatedSetting = await Settings.findOne({});
  fs.writeFileSync(
    `${__dirname}/../settings.json`,
    JSON.stringify(updatedSetting),
    'utf-8'
  );
  res.status(200).json({
    status: 'success',
    data: {
      data: updatedSetting,
    },
  });
});

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

// exports.fetchWarnings = catchAsync(async (req, res, next) => {
//   const userId = req.user._id;
//   const reportWarnings = await Report.find({
//     $and: [
//       { reportedUser: userId },
//       { reviewStatus: 'positive' },
//       { userNotified: false },
//       { updatedAt: { $gt: Date.now() - 1 * 24 * 60 * 60 * 1000 } },
//     ],
//   })
//     .populate('reportedByUser')
//     .populate('reportedUser');

//   // await Report.updateMany(
//   //   {
//   //     $and: [
//   //       { reportedUser: userId },
//   //       { reviewStatus: 'positive' },
//   //       { userNotified: false },
//   //       { updatedAt: { $gt: Date.now() - 1 * 24 * 60 * 60 * 1000 } },
//   //     ],
//   //   },
//   //   {
//   //     userNotified: true,
//   //   }
//   // );
//   res.status(200).json({
//     status: 'success',
//     nReports: reportWarnings.length,
//     data: {
//       data: reportWarnings,
//     },
//   });
// });

// exports.getToBeBlockedAccounts = catchAsync(async (req, res, next) => {
//   const accounts = await Report.aggregate([
//     {
//       $match: { reviewStatus: 'positive' },
//     },
//     {
//       $group: {
//         _id: '$reportedUser',
//         reportCount: { $sum: 1 },
//       },
//     },
//   ]);
//   await User.populate(accounts, { path: '_id' });
//   const filtered = accounts.filter(acc => acc.reportCount >= 2);
//   res.status(200).json({
//     status: 'success',
//     data: {
//       data: filtered,
//     },
//   });
// });

// exports.suspendAccount = catchAsync(async (req, res, next) => {
//   const { userId } = req.body;

//   const suspenededAcc = await User.findByIdAndUpdate(
//     userId,
//     {
//       active: false,
//     },
//     { new: true }
//   );

//   res.status(200).json({
//     status: 'success',
//     data: {
//       data: suspenededAcc,
//     },
//   });
// });

// // exports.getReports = catchAsync(async (req, res, next) => {
// //   let reports = await Report.find({})
// //     .populate('reportedByUser')
// //     .populate('reportedUser');

// //   res.status(200).json({
// //     status: 'success',
// //     data: {
// //       data: reports,
// //     },
// //   });
// // });

// // exports.getReportsForAdmin = catchAsync(async (req, res, next) => {
// //   const { adminId } = req.body;
// //   let reports = await Report.find({
// //     $and: [
// //       { adminId },
// //       {
// //         reviewStatus: 'pending',
// //       },
// //     ],
// //   })
// //     .populate('reportedByUser')
// //     .populate('reportedUser');

// //   res.status(200).json({
// //     status: 'success',
// //     data: {
// //       data: reports,
// //     },
// //   });
// // });

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
