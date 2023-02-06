const Report = require('../models/reportModel');
const catchAsync = require('../utils/catchAsync');
const factory = require('../controllers/handlerFactory');

exports.reportUser = catchAsync(async (req, res, next) => {
  const userId = req.user._id;
  const reportedUserId = req.params.id;

  const report = await Report.create({
    userId,
    reportedUserId,
    reason: req.body.reason,
  });

  res.status(200).json({
    status: 'success',
    message: 'User reported',
    data: {
      data: report,
    },
  });
});

exports.reviewReport = catchAsync(async (req, res, next) => {
  const adminId = req.user._id;
  const reviewStatus = req.body.reviewStatus;
  const updatedReport = await Report.findByIdAndUpdate(
    req.params.id,
    {
      adminId,
      reviewStatus,
    },
    {
      runValidators: false,
      new: true,
    }
  );

  res.status(200).json({
    status: 'success',
    data: {
      data: updatedReport,
    },
  });
});

exports.getReports = factory.getAll(Report);
exports.getReport = factory.getOne(Report);
