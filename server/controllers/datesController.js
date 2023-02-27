const Connection = require('../models/connectionsModel');
const date = require('../models/dateModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

// Invite for a date
// Tested
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

  let newDate = await date.create({
    senderId: userId,
    receiverId,
    scheduledAt,
    dateType,
  });

  newDate = await newDate
    .populate('senderId')
    .populate('receiverId')
    .execPopulate();
  res.status(200).json({
    status: 'success',
    data: {
      data: newDate,
    },
  });
});

// Accept a date invite
// Tested
exports.acceptDate = catchAsync(async (req, res, next) => {
  const userId = req.user._id;
  const senderId = req.params.id;
  let updatedDate = await date.findOneAndUpdate(
    {
      receiverId: userId,
      senderId: senderId,
      status: 'pending',
    },
    {
      status: 'accepted',
    },
    {
      new: true,
      validateBeforeSave: false,
    }
  );

  if (!updatedDate) {
    return next(new AppError('Accept unauthorized', 401));
  }
  updatedDate = await updatedDate
    .populate('senderId')
    .populate('receiverId')
    .execPopulate();

  res.status(200).json({
    status: 'success',
    data: {
      data: updatedDate,
    },
  });
});

// Get all the scheduled date of the currently logged in user
// Tested
exports.getAllScheduledDates = catchAsync(async (req, res, next) => {
  const userId = req.user._id;
  const allConfirmedDates = await date
    .find({
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
    })
    .populate('senderId')
    .populate('receiverId');
  res.status(200).json({
    status: 'success',
    data: {
      data: allConfirmedDates,
    },
  });
});

// Get all sent date requests
// Tested
exports.getAllSentDates = catchAsync(async (req, res, next) => {
  const userId = req.user._id;
  const allPendingsentDates = await date
    .find({
      senderId: userId,
      status: 'pending',
      scheduledAt: {
        $gte: Date.now(),
      },
    })
    .populate('senderId')
    .populate('receiverId');
  res.status(200).json({
    status: 'success',
    data: {
      data: allPendingsentDates,
    },
  });
});

// Get all sent date requests
// Tested
exports.getAllReceivedDates = catchAsync(async (req, res, next) => {
  const userId = req.user._id;
  const allPendingreceivedDates = await date
    .find({
      $or: [
        {
          receiverId: userId,
        },
      ],
      status: 'pending',
      scheduledAt: {
        $gte: Date.now(),
      },
    })
    .populate('senderId')
    .populate('receiverId');
  res.status(200).json({
    status: 'success',
    data: {
      data: allPendingreceivedDates,
    },
  });
});

// Postpone date
// Tested
exports.postponeDate = catchAsync(async (req, res, next) => {
  const userId = req.user._id;
  const receiverId = req.params.id;
  const postDate = await date.findOneAndUpdate(
    {
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
      scheduledAt: {
        $gte: Date.now(),
      },
      status: 'accepted',
    },
    {
      scheduledAt: new Date(req.body.scheduledAt),
    },
    {
      validateBeforeSave: true,
      new: true,
    }
  );

  if (!postDate) {
    return next(new AppError('Request failed', 500));
  }
  res.status(200).json({
    status: 'success',
    data: {
      data: postDate,
    },
  });
});

// Cancel Scheduled Date
// Tested
exports.removeDate = catchAsync(async (req, res, next) => {
  const userId = req.user._id;
  const receiverId = req.params.id;
  await date.findOneAndDelete({
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
    status: 'accepted',
  });

  res.status(200).json({
    status: 'success',
    data: null,
  });
});

// Cancel Date Request
// Tested
exports.cancelDateInvite = catchAsync(async (req, res, next) => {
  const userId = req.user._id;
  const removeUserId = req.params.id;
  await date.findOneAndDelete({
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

  res.status(200).json({
    status: 'success',
    data: null,
  });
});
