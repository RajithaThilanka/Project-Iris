const Connection = require('../models/connectionsModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const User = require('../models/userModel');

//INVITE FOR A CONNECTION

exports.inviteConnection = catchAsync(async (req, res, next) => {
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
  });
  if (doc) {
    return next(new AppError('Request unauthorized', 401));
  }

  let connection = await Connection.create({
    senderId: userId,
    receiverId,
  });
  connection = await connection
    .populate({
      path: 'senderId',
    })
    .populate({
      path: 'receiverId',
    })
    .execPopulate();
  res.status(200).json({
    status: 'success',
    data: {
      data: connection,
    },
  });
});

//ACCEPT A CONNECTION

exports.acceptConnection = catchAsync(async (req, res, next) => {
  const userId = req.user._id;
  const senderId = req.params.id;
  let updatedConnection = await Connection.findOneAndUpdate(
    {
      receiverId: userId,
      senderId: senderId,
      status: 'con-req-pending',
    },
    {
      status: 'connected',
    },
    {
      runValidators: true,
      new: true,
    }
  );

  updatedConnection = await updatedConnection
    .populate({
      path: 'senderId',
    })
    .populate({ path: 'receiverId' })
    .execPopulate();
  if (!updatedConnection) {
    return next(new AppError('Accept unauthorized', 401));
  }
  await User.findByIdAndUpdate(userId, {
    $push: {
      connections: senderId,
    },
  });

  await User.findByIdAndUpdate(senderId, {
    $push: {
      connections: userId,
    },
  });

  res.status(200).json({
    status: 'success',
    data: {
      data: updatedConnection,
    },
  });
});

// Remove connection

exports.removeConnection = catchAsync(async (req, res, next) => {
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
    $or: [
      {
        status: 'connected',
      },
      {
        status: 'friend-req-pending',
      },
      {
        status: 'friends',
      },
    ],
  });

  if (!doc) {
    return next(new AppError('No connection found', 404));
  }

  await User.findByIdAndUpdate(userId, {
    $pull: {
      connections: removeUserId,
    },
  });
  await User.findByIdAndUpdate(removeUserId, {
    $pull: {
      connections: userId,
    },
  });
  await doc.deleteOne();

  res.status(200).json({
    status: 'success',
    data: null,
  });
});

// Cancel Connection Invitation

exports.cancelConnectionInvite = catchAsync(async (req, res, next) => {
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
    status: 'con-req-pending',
  });

  if (!doc) {
    return next(new AppError('Cancel connection request unauthorized', 401));
  }

  await doc.deleteOne();

  res.status(200).json({
    status: 'success',
    data: null,
  });
});

// Get all conneciton received requests

// Sending only an array of userId s

exports.getConnectionRequestsReceived = catchAsync(async (req, res, next) => {
  const userId = req.user._id;

  const connectionRequestsReceived = await Connection.aggregate([
    {
      $match: {
        receiverId: userId,
        status: 'con-req-pending',
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
      data: connectionRequestsReceived,
    },
  });
});

// Get all conneciton sent requests

exports.getConnectionRequestsSent = catchAsync(async (req, res, next) => {
  const userId = req.user._id;

  const connectionRequestsSent = await Connection.find({
    senderId: userId,
    status: 'con-req-pending',
  })
    .populate({
      path: 'senderId',
    })
    .populate({
      path: 'receiverId',
    });

  res.status(200).json({
    status: 'success',
    nRequests: connectionRequestsSent.length,
    data: {
      data: connectionRequestsSent,
    },
  });
});
