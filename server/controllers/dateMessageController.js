const DateMessage = require('../models/dateMessageModel');
const catchAsync = require('../utils/catchAsync');
const User = require('../models/userModel');
const DateChat = require('../models/dateChatModel');
const date = require('../models/dateModel');
const AppError = require('../utils/appError');

exports.sendDateMessage = catchAsync(async (req, res, next) => {
  const { content, chatId } = req.body;
  if (!content | !chatId) {
    return next(new AppError('Invalid data passed', 400));
  }

  const newMessage = {
    sender: req.user._id,
    content: content,
    chat: chatId,
  };
  try {
    let message = await DateMessage.create(newMessage);
    message = await message
      .populate('sender', 'firstname profilePhoto')
      .execPopulate();
    message = await message.populate('chat').execPopulate();
    message = await User.populate(message, {
      path: 'chat.users',
      select: 'firstname profilePhoto email',
    });
    await DateChat.findByIdAndUpdate(req.body.chatId, {
      latestMessage: message,
    });
    res.status(200).json({
      status: 'success',
      data: {
        data: message,
      },
    });
  } catch (error) {
    return next(new AppError(error, 500));
  }
});

exports.allDateMessages = catchAsync(async (req, res, next) => {
  try {
    const messages = await DateMessage.find({ chat: req.body.chatId })
      .populate('sender', 'name firstname profilePhoto email')
      .populate('chat');
    res.status(200).json({
      status: 'success',
      data: {
        data: messages,
      },
    });
  } catch (error) {
    return next(new AppError(error, 400));
  }
});
