const Chat = require('../models/chatModel');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

exports.createChat = catchAsync(async (req, res, next) => {
  const newChat = new Chat({
    members: [req.body.senderId, req.body.receiverId],
  });
  const result = await newChat.save();
  res.status(200).json({
    status: 'success',
    data: {
      data: result,
    },
  });
});

exports.userChats = catchAsync(async (req, res, next) => {
  const chat = await Chat.find({
    members: { $in: [req.params.userId] },
  });
  if (chat.length === 0) {
    return next(new AppError('No chat found', 404));
  }
  res.status(200).json({
    status: 'success',
    data: {
      data: chat,
    },
  });
});

exports.findChat = catchAsync(async (req, res, next) => {
  const chat = await Chat.findOne({
    members: {
      $all: [req.params.firstId, req.params.secondId],
    },
  });
  if (!chat) {
    return next(new AppError('No chat found', 404));
  }
  res.status(200).json({
    status: 'success',
    data: {
      data: chat,
    },
  });
});
