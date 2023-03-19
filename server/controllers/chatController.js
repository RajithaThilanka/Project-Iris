const Chat = require('../models/chatModel');
const User = require('../models/userModel');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
const mongoose = require('mongoose');
exports.accessChat = catchAsync(async (req, res, next) => {
  let { userId } = req.body;

  if (!userId) {
    return next(new AppError('UserId param not sent with request', 400));
  }
  let isChat = await Chat.find({
    isGroupChat: false,
    $and: [
      { users: { $elemMatch: { $eq: req.user._id } } },
      { users: { $elemMatch: { $eq: userId } } },
    ],
  })
    .populate('users', '-password')
    .populate('latestMessage');

  isChat = await User.populate(isChat, {
    path: 'latestMessage.sender',
    select: 'firstname profilePhoto email',
  });
  if (isChat.length > 0) {
    res.status(200).json({
      status: 'success',
      data: {
        data: isChat[0],
      },
    });
  } else {
    const chatData = {
      chatName: 'sender',
      isGroupChat: false,
      users: [req.user._id, userId],
    };
    try {
      const createdChat = await Chat.create(chatData);
      const FullChat = await Chat.findOne({ _id: createdChat._id }).populate(
        'users',
        '-password'
      );
      res.status(200).json({
        status: 'success',
        data: {
          data: FullChat,
        },
      });
    } catch (error) {
      return next(new AppError('Error creating chat', 500));
    }
  }
});

exports.fetchChats = catchAsync(async (req, res, next) => {
  try {
    Chat.find({
      users: { $elemMatch: { $eq: req.user._id } },
    })
      .populate('users', '-password')
      .populate('groupAdmin', '-password')
      .populate('latestMessage')
      .sort({ updatedAt: -1 })
      .then(async results => {
        results = await User.populate(results, {
          path: 'latestMessage.sender',
          select: 'firstname profilePhoto email',
        });

        const filteredChats = results.filter(chat => {
          const currentChat = chat;
          const hasDeleted = currentChat.invisibleArr.find(
            c =>
              c.userId + '' == req.user._id &&
              currentChat.latestMessage.createdAt <= c.deletedAt
          );
          return !hasDeleted;
        });
        res.status(200).json({
          status: 'success',
          data: {
            data: filteredChats,
          },
        });
      });
  } catch (error) {
    return next(new AppError(error, 500));
  }
});

exports.createGroupChat = catchAsync(async (req, res, next) => {
  if (!req.body.users || !req.body.name) {
    return next(new AppError('Please fill all the fields', 400));
  }

  const users = req.body.users;
  if (users.length < 2) {
    return next(
      new AppError('More than 2 users are required to form a group chat', 400)
    );
  }
  users.push(req.user);
  try {
    const groupChat = await Chat.create({
      chatName: req.body.name,
      users: users,
      isGroupChat: true,
      groupAdmin: req.user,
    });

    const fullGroupChat = await Chat.findOne({ _id: groupChat._id })
      .populate('users', '-password')
      .populate('groupAdmin', '-password');
    res.status(200).json({
      status: 'success',
      data: {
        data: fullGroupChat,
      },
    });
  } catch (error) {
    return next(new AppError(error, 400));
  }
  // res.status(200).json({
  //   status: 'success',
  //   data: {
  //     data: chat,
  //   },
  // });
});
exports.renameGroup = catchAsync(async (req, res, next) => {
  const { chatId, chatName } = req.body;
  const updatedChat = await Chat.findByIdAndUpdate(
    chatId,
    {
      chatName,
    },
    { new: true }
  )
    .populate('users', '-password')
    .populate('groupAdmin', '-password');
  res.status(200).json({
    status: 'success',
    data: {
      data: updatedChat,
    },
  });
});
exports.addToGroup = catchAsync(async (req, res, next) => {
  const { chatId, userId } = req.body;
  const added = await Chat.findByIdAndUpdate(
    chatId,
    {
      $push: { users: userId },
    },
    { new: true }
  )
    .populate('users', '-password')
    .populate('groupAdmin', '-password');
  if (!added) {
    return next(new AppError('Chat not found', 404));
  }
  res.status(200).json({
    status: 'success',
    data: {
      data: added,
    },
  });
});

exports.removeFromGroup = catchAsync(async (req, res, next) => {
  const { chatId, userId } = req.body;
  const removed = await Chat.findByIdAndUpdate(
    chatId,
    {
      $pull: { users: userId },
    },
    { new: true }
  )
    .populate('users', '-password')
    .populate('groupAdmin', '-password');
  if (!removed) {
    return next(new AppError('Chat not found', 404));
  }
  res.status(200).json({
    status: 'success',
    data: {
      data: removed,
    },
  });
});

exports.deleteChat = catchAsync(async (req, res, next) => {
  const chatId = req.params.id;
  // await Chat.findByIdAndUpdate(
  //   chatId,
  //   {
  //     $push: { invisible: req.user._id },
  //   },
  //   { new: true }
  // );
  const chat = await Chat.findById(chatId);
  const toBeUpdatedInvisible = chat.invisibleArr.find(
    obj => obj.userId + '' == req.user._id
  );
  if (!toBeUpdatedInvisible) {
    chat.invisibleArr.push({
      userId: req.user._id,
      deletedAt: Date.now(),
    });
  } else {
    toBeUpdatedInvisible.deletedAt = Date.now();
  }
  chat.save();
  res.status(200).json({
    status: 'success',
    data: {
      data: newChat,
    },
  });
});
// exports.userChats = catchAsync(async (req, res, next) => {
//   const chat = await Chat.find({
//     members: { $in: [req.params.userId] },
//   });
//   if (chat.length === 0) {
//     return next(new AppError('No chat found', 404));
//   }
//   res.status(200).json({
//     status: 'success',
//     data: {
//       data: chat,
//     },
//   });
// });

// exports.findChat = catchAsync(async (req, res, next) => {
//   const chat = await Chat.findOne({
//     members: {
//       $all: [req.params.firstId, req.params.secondId],
//     },
//   });
//   if (!chat) {
//     return next(new AppError('No chat found', 404));
//   }
//   res.status(200).json({
//     status: 'success',
//     data: {
//       data: chat,
//     },
//   });
// });
