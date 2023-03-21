const Message = require('../models/messageModel');
const catchAsync = require('../utils/catchAsync');
const User = require('../models/userModel');
const Chat = require('../models/chatModel');
const AppError = require('../utils/appError');

exports.sendMessage = catchAsync(async (req, res, next) => {
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
    let message = await Message.create(newMessage);
    message = await message
      .populate('sender', 'firstname profilePhoto')
      .execPopulate();
    message = await message.populate('chat').execPopulate();
    message = await User.populate(message, {
      path: 'chat.users',
      select: 'firstname profilePhoto email',
    });
    await Chat.findByIdAndUpdate(req.body.chatId, {
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

exports.allMessages = catchAsync(async (req, res, next) => {
  try {
    const messages = await Message.find({ chat: req.params.chatId })
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

exports.setSeen = catchAsync(async (req, res, next) => {
  try {
    const updatedMsg = await Message.findOneAndUpdate(
      {
        $and: [{ _id: req.params.id }, { sender: { $ne: req.user._id } }],
      },
      {
        isSeen: true,
      },
      { new: true }
    );
    res.status(200).json({
      status: 'success',
      data: {
        data: updatedMsg,
      },
    });
  } catch (error) {
    return next(new AppError(error, 400));
  }
});

exports.setSeenAll = catchAsync(async (req, res, next) => {
  try {
    const updatedMsgs = await Message.updateMany(
      {
        $and: [
          { chat: req.params.id },
          { isSeen: false },
          { sender: { $ne: req.user._id } },
        ],
      },
      {
        isSeen: true,
      }
    );
    res.status(200).json({
      status: 'success',
      data: {
        data: updatedMsgs,
      },
    });
  } catch (error) {
    return next(new AppError(error, 400));
  }
});
