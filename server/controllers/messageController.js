const Message = require('../models/messageModel');
const catchAsync = require('../utils/catchAsync');

exports.addMessage = catchAsync(async (req, res, next) => {
  const { chatId, senderId, text } = req.body;
  const message = new Message({
    chatId,
    senderId,
    text,
  });

  const result = await message.save();
  res.status(200).json({
    status: 'success',
    data: {
      data: result,
    },
  });
});

exports.getMessages = catchAsync(async (req, res, next) => {
  const { chatId } = req.params;

  const result = await Message.find({ chatId });

  res.status(200).json({
    status: 'success',
    data: {
      data: result,
    },
  });
});
