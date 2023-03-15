const Connection = require('../models/connectionsModel');
const date = require('../models/dateModel');
const User = require('../models/userModel');
const DateChat = require('../models/dateChatModel');
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

  const doc = await date.findOne({
    $and: [
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
      },
      {
        $or: [
          {
            status: 'pending',
          },
          {
            status: 'accepted',
          },
        ],
      },
      {
        scheduledAt: {
          $gte: Date.now(),
        },
      },
    ],
  });
  if (doc) {
    return next(new AppError('Date Request unauthorized', 401));
  }

  const { scheduledAt, dateType } = req.body;

  const newDateChat = await DateChat.create({
    users: [userId, receiverId],
  });
  let newDate = await date.create({
    senderId: userId,
    receiverId,
    scheduledAt,
    dateType,
    chat: newDateChat._id,
  });

  newDate = await newDate
    .populate('senderId')
    .populate('receiverId')
    .populate('chat')
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
      $and: [
        {
          $or: [
            {
              senderId: userId,
            },
            {
              receiverId: userId,
            },
          ],
        },
        {
          scheduledAt: {
            $gte: Date.now() - 24 * 60 * 60 * 1000,
          },
        },
      ],
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
  const postDate = await date
    .findOneAndUpdate(
      {
        $and: [
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
          },
          {
            scheduledAt: {
              $gte: Date.now(),
            },
          },
          { status: 'accepted' },
        ],
      },
      {
        scheduledAt: new Date(req.body.scheduledAt),
      },
      {
        validateBeforeSave: true,
        new: true,
      }
    )
    .populate('senderId')
    .populate('receiverId');

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

exports.accessDateChat = catchAsync(async (req, res, next) => {
  let { dateId } = req.body;

  if (!dateId) {
    return next(new AppError('Date Id param not sent with request', 400));
  }
  let dt = await date.findById(dateId);

  let isChat = await DateChat.findById(dt.chat)
    .populate('users', '-password')
    .populate('latestMessage');

  isChat = await User.populate(isChat, {
    path: 'latestMessage.sender',
    select: 'firstname profilePhoto email',
  });

  res.status(200).json({
    status: 'success',
    data: {
      data: isChat,
    },
  });
});

exports.fetchDateChats = catchAsync(async (req, res, next) => {
  let { dateId } = req.body;
  if (!dateId) {
    return next(new AppError('Date Id param not sent with request', 400));
  }
  let dt = await date.findById(dateId);
  try {
    DateChat.findById(dt.chat)
      .populate('users', '-password')
      .populate('latestMessage')
      .sort({ updatedAt: -1 })
      .then(async results => {
        results = await User.populate(results, {
          path: 'latestMessage.sender',
          select: 'firstname profilePhoto email',
        });
        res.status(200).json({
          status: 'success',
          data: {
            data: results,
          },
        });
      });
  } catch (error) {
    return next(new AppError(error, 500));
  }
});
