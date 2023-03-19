const Connection = require('../models/connectionsModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const User = require('../models/userModel');

// Send a friend request
// Tested
exports.inviteFriend = catchAsync(async (req, res, next) => {
  const userId = req.user._id;
  const receiverId = req.params.id;

  if (userId === receiverId) {
    return next(new AppError('Request to yourself unauthorized', 401));
  }
  let updatedConnection = await Connection.findOneAndUpdate(
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
        { status: 'connected' },
      ],
    },
    {
      status: 'friend-req-pending',
    },
    {
      runValidators: false,
      new: true,
    }
  );
  if (!updatedConnection) {
    return next(new AppError('Friend Request unauthorized', 401));
  }

  updatedConnection.senderId = userId;
  updatedConnection.receiverId = receiverId;
  await updatedConnection.save();
  updatedConnection = await updatedConnection
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
      data: updatedConnection,
    },
  });
});

// Accept a friend request
// Tested
exports.acceptFriend = catchAsync(async (req, res, next) => {
  const userId = req.user._id;
  const senderId = req.params.id;
  let updatedConnection = await Connection.findOneAndUpdate(
    {
      receiverId: userId,
      senderId: senderId,
      status: 'friend-req-pending',
    },
    {
      status: 'friends',
    },
    {
      new: true,
      validateBeforeSave: false,
    }
  );

  if (!updatedConnection) {
    return next(new AppError('Friend Request Accept unauthorized', 401));
  }

  updatedConnection = await updatedConnection
    .populate({
      path: 'senderId',
    })
    .populate({ path: 'receiverId' })
    .execPopulate();

  res.status(200).json({
    status: 'success',
    data: {
      data: updatedConnection,
    },
  });
});

// Unfriend a user
// Tested
exports.removeFriend = catchAsync(async (req, res, next) => {
  const userId = req.user._id;
  const removeUserId = req.params.id;
  let updatedConnection = await Connection.findOneAndUpdate(
    {
      $and: [
        {
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
        },
        {
          status: 'friends',
        },
      ],
    },
    {
      status: 'connected',
    },
    {
      new: true,
      validateBeforeSave: false,
    }
  );

  if (!updatedConnection) {
    return next(new AppError('No friend found', 404));
  }

  res.status(200).json({
    status: 'success',
    data: null,
  });
});

// Cancel friend request
// Tested
exports.cancelFriendInvite = catchAsync(async (req, res, next) => {
  const userId = req.user._id;
  const removeUserId = req.params.id;
  const doc = await Connection.findOneAndUpdate(
    {
      $and: [
        {
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
        },
        { status: 'friend-req-pending' },
      ],
    },
    {
      status: 'connected',
    }
  );

  if (!doc) {
    return next(new AppError('Cancel friend request unauthorized', 401));
  }

  res.status(200).json({
    status: 'success',
    data: null,
  });
});

// Get all friend received requests
// Tested
exports.getFriendRequestsReceived = catchAsync(async (req, res, next) => {
  const userId = req.user._id;

  let friendsRequestsReceived = await Connection.find({
    receiverId: userId,
    status: 'friend-req-pending',
  })
    .populate({
      path: 'senderId',
    })
    .populate({
      path: 'receiverId',
    });

  res.status(200).json({
    status: 'success',
    nRequests: friendsRequestsReceived.length,
    data: {
      data: friendsRequestsReceived,
    },
  });
});

// Get all friend sent requests
// Tested
exports.getFriendRequestsSent = catchAsync(async (req, res, next) => {
  const userId = req.user._id;

  const friendsRequestsSent = await Connection.find({
    senderId: userId,
    status: 'friend-req-pending',
  })
    .populate({
      path: 'senderId',
    })
    .populate({
      path: 'receiverId',
    });

  res.status(200).json({
    status: 'success',
    nRequests: friendsRequestsSent.length,
    data: {
      data: friendsRequestsSent,
    },
  });
});

// Tested
exports.checkFriend = catchAsync(async (req, res, next) => {
  const userId = req.user._id;
  const receiverId = req.params.id;

  const doc = await Connection.findOne({
    $and: [
      {
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
      },
      { status: 'friends' },
    ],
  });
  if (!doc) {
    return next(new AppError('You are not friends with the user', 401));
  }
  next();
});
// Tested
exports.getFriends = catchAsync(async (req, res, next) => {
  const userId = req.user._id;
  const friends = await Connection.find({
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
      { status: 'friends' },
    ],
  })
    .populate('senderId')
    .populate('receiverId');

  // const finalFriends = friends.map(con => {
  //   const { senderId } = con;

  //   return senderId._id + '' != userId ? con.senderId : con.receiverId;
  // });
  res.status(200).json({
    status: 'success',
    nConnections: friends.length,
    data: {
      data: friends,
    },
  });
});

// Review a completed date
//  Post a review for the app
// Delete a review
// Update review
// Get ml data
