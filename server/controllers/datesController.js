const Connection = require('../models/connectionsModel');
const date = require('../models/dateModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

// Invite for a date
exports.inviteDate = catchAsync(async (req, res, next) => {
  const userId = req.user._id;
  const receiverId = req.params.id;

  if (userId === receiverId) {
    return next(new AppError('Date Request to yourself unauthorized', 401));
  }

  const doc = await Connection.findOne({
    $or: [
      {
        senderId: userId,
        receiverId: receiverId,
      },
      {
        senderId: receiverId,
        receiverId: userId,
      },
    ],
    $or: [
      {
        status: 'pending',
      },
      {
        status: 'accepted',
      },
    ],
  });
  if (doc) {
    return next(new AppError('Date Request unauthorized', 401));
  }

  const { scheduledAt, dateType } = req.body;

  const newDate = await date.create({
    senderId: userId,
    receiverId,
    scheduledAt,
    dateType,
  });

  res.status(200).json({
    status: 'success',
    data: {
      data: newDate,
    },
  });
});

exports.acceptDate = catchAsync(async (req, res, next) => {
  const userId = req.user._id;
  const senderId = req.params.id;
  const doc = await date.findOne({
    receiverId: userId,
    senderId: senderId,
    status: 'pending',
  });

  if (!doc) {
    return next(new AppError('Accept unauthorized', 401));
  }

  const updatedDate = await doc.updateOne(
    {
      status: 'accepted',
    },
    {
      new: true,
      validateBeforeSave: false,
    }
  );

  res.status(200).json({
    status: 'success',
    data: {
      data: updatedDate,
    },
  });
});

exports.getAllScheduledDates = catchAsync(async (req, res, next) => {
  const userId = req.user._id;
  const allConfirmedDates = await date.find({
    $or: [
      {
        senderId: userId,
      },
      {
        receiverId: userId,
      },
    ],
    scheduledAt: {
      $gte: Date.now(),
    },
    status: 'accepted',
  });
  res.status(200).json({
    status: 'success',
    data: {
      allConfirmedDates,
    },
  });
});

exports.getAllSentDates = catchAsync(async (req, res, next) => {
  const userId = req.user._id;
  const status = req.params.status;
  const allPendingsentDates = await date.find({
    senderId: userId,
    scheduledAt: {
      $gte: Date.now(),
    },
    status,
  });
  res.status(200).json({
    status: 'success',
    data: {
      allPendingsentDates,
    },
  });
});

exports.getAllReceivedDates = catchAsync(async (req, res, next) => {
  const userId = req.user._id;
  const status = req.params.status;
  const allPendingreceivedDates = await date.find({
    $or: [
      {
        receiverId: userId,
      },
    ],
    scheduledAt: {
      $gte: Date.now(),
    },
    status,
  });
  res.status(200).json({
    status: 'success',
    data: {
      allPendingreceivedDates,
    },
  });
});

// Postpone date
exports.postponeDate = catchAsync(async (req, res, next) => {
  const postDate = await date.findById(req.params.id);
  postDate.scheduledAt = req.body.scheduledAt || Date.now();
  postDate.save({
    validateBeforeSave: false,
  });

  res.status(200).json({
    status: 'success',
    data: {
      data: postDate,
    },
  });
});

// Cancel Scheduled Date

exports.removeDate = catchAsync(async (req, res, next) => {
  const id = req.params.id;

  const doc = await date.findById(id);

  if (!doc) {
    return next(new AppError('No date found', 404));
  }
  await doc.deleteOne();

  res.status(200).json({
    status: 'success',
    data: null,
  });
});

// Cancel Date Request
exports.cancelDateInvite = catchAsync(async (req, res, next) => {
  const userId = req.user._id;
  const removeUserId = req.params.id;
  const doc = await date.findOne({
    $or: [
      {
        senderId: userId,
        receiverId: removeUserId,
      },
      {
        senderId: removeUserId,
        receiverId: userId,
      },
    ],
    status: 'pending',
  });

  if (!doc) {
    return next(new AppError('Cancel date request unauthorized', 401));
  }

  await doc.deleteOne();

  res.status(200).json({
    status: 'success',
    data: null,
  });
});
