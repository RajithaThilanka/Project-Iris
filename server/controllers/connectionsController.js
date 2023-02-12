const Connection = require('../models/connectionsModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const User = require('../models/userModel');

// Dini
// Invite for a connection
// Tested
exports.inviteConnection = catchAsync(async (req, res, next) => {
  const userId = req.user._id; //sender ID
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

// Dini
// Accept a connection request
// Tested

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
  if (!updatedConnection) {
    return next(new AppError('Accept unauthorized', 401));
  }
  updatedConnection = await updatedConnection
    .populate({
      path: 'senderId',
    })
    .populate({ path: 'receiverId' })
    .execPopulate();

  // await User.findByIdAndUpdate(userId, {
  //   $push: {
  //     connections: senderId,
  //   },
  // });

  // await User.findByIdAndUpdate(senderId, {
  //   $push: {
  //     connections: userId,
  //   },
  // });

  res.status(200).json({
    status: 'success',
    data: {
      data: updatedConnection,
    },
  });
});

// Remove connection
// Tested
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
    ],
  });

  if (!doc) {
    return next(new AppError('No connection found', 404));
  }

  await doc.deleteOne();

  res.status(200).json({
    status: 'success',
    data: null,
  });
});

// Cancel Connection Invitation
// Tested
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
// Tested

exports.getConnectionRequestsReceived = catchAsync(async (req, res, next) => {
  const userId = req.user._id;

  let connectionRequestsReceived = await Connection.find({
    receiverId: userId,
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
    nRequests: connectionRequestsReceived.length,
    data: {
      data: connectionRequestsReceived,
    },
  });
});

// Get all conneciton sent requests
// Tested
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

// Tested
exports.getConnections = catchAsync(async (req, res, next) => {
  const userId = req.user._id;
  const connections = await Connection.find({
    $or: [
      {
        senderId: userId,
      },
      {
        receiverId: userId,
      },
    ],
    status: 'connected',
  })
    .populate('senderId')
    .populate('receiverId');

  const finalConnections = connections.map(con => {
    const { senderId } = con;

    return senderId._id + '' != userId ? con.senderId : con.receiverId;
  });
  res.status(200).json({
    status: 'success',
    nConnections: finalConnections.length,
    data: {
      data: finalConnections,
    },
  });
});
