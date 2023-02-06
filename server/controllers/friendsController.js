const Connection = require('../models/connectionsModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const User = require('../models/userModel');

// Send a friend request

exports.inviteFriend = catchAsync(async (req, res, next) => {
  const userId = req.user._id;
  const receiverId = req.params.id;

  if (userId === receiverId) {
    return next(new AppError('Request to yourself unauthorized', 401));
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
    status: 'connected',
  });
  if (!doc) {
    return next(new AppError('Friend Request unauthorized', 401));
  }

  const updatedConnection = await doc.updateOne(
    {
      status: 'friend-req-pending',
    },
    {
      runValidators: false,
      new: true,
    }
  );

  res.status(200).json({
    status: 'success',
    data: {
      connection: updatedConnection,
    },
  });
});

// Accept a friend request

exports.acceptFriend = catchAsync(async (req, res, next) => {
  const userId = req.user._id;
  const senderId = req.params.id;
  const doc = await Connection.findOne({
    receiverId: userId,
    senderId: senderId,
    status: 'friend-req-pending',
  });

  if (!doc) {
    return next(new AppError('Friend Request Accept unauthorized', 401));
  }

  const updatedConnection = await doc.updateOne(
    {
      status: 'friends',
    },
    {
      new: true,
      validateBeforeSave: false,
    }
  );
  await User.findByIdAndUpdate(userId, {
    $push: {
      friends: senderId,
    },
  });

  await User.findByIdAndUpdate(senderId, {
    $push: {
      friends: userId,
    },
  });

  res.status(200).json({
    status: 'success',
    data: {
      connection: updatedConnection,
    },
  });
});

// Unfriend a user

exports.removeFriend = catchAsync(async (req, res, next) => {
  const userId = req.user._id;
  const removeUserId = req.params.id;
  const doc = await Connection.findOne({
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
    status: 'friends',
  });

  if (!doc) {
    return next(new AppError('No friend found', 404));
  }

  await User.findByIdAndUpdate(userId, {
    $pull: {
      friends: removeUserId,
    },
  });
  await User.findByIdAndUpdate(removeUserId, {
    $pull: {
      friends: userId,
    },
  });
  await doc.deleteOne();

  res.status(200).json({
    status: 'success',
    data: null,
  });
});

// Cancel friend request
exports.cancelFriendInvite = catchAsync(async (req, res, next) => {
  const userId = req.user._id;
  const removeUserId = req.params.id;
  const doc = await Connection.findOne({
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
    status: 'friend-req-pending',
  });

  if (!doc) {
    return next(new AppError('Cancel friend request unauthorized', 401));
  }

  await doc.deleteOne();

  res.status(200).json({
    status: 'success',
    data: null,
  });
});

// Get all friend received requests

// Sending only an array of userId s

exports.getFriendRequestsReceived = catchAsync(async (req, res, next) => {
  const userId = req.user._id;

  const friendRequestsReceived = await Connection.aggregate([
    {
      $match: {
        receiverId: userId,
        status: 'friend-req-pending',
      },
    },
    {
      $group: {
        _id: '$receiverId',
        nRequests: { $sum: 1 },
        receivedFrom: { $push: '$senderId' },
      },
    },
  ]);

  res.status(200).json({
    status: 'success',
    data: {
      data: friendRequestsReceived,
    },
  });
});

// Get all friend sent requests

exports.getFriendRequestsSent = catchAsync(async (req, res, next) => {
  const userId = req.user._id;

  const friendRequestsSent = await Connection.aggregate([
    {
      $match: {
        senderId: userId,
        status: 'friend-req-pending',
      },
    },
    {
      $group: {
        _id: '$senderId',
        nRequests: { $sum: 1 },
        sentTo: { $push: '$receiverId' },
      },
    },
  ]);

  res.status(200).json({
    status: 'success',
    data: {
      data: friendRequestsSent,
    },
  });
});

exports.checkFriend = catchAsync(async (req, res, next) => {
  const userId = req.user._id;
  const receiverId = req.params.id;
  const doc = await Connection.findOne({
    $or: [
      {
        senderId: userId,
        receiverId,
      },
      {
        senderId: receiverId,
        receiverId: userId,
      },
    ],
    status: 'friends',
  });
  if (!doc) {
    return next(new AppError('You are not friends with the user', 401));
  }
  next();
});

// Review a completed date
//  Post a review for the app
// Delete a review
// Update review
// Get ml data
