const User = require('../models/userModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

const APIFeatures = require('../utils/apiFeatures');
const LookingFor = require('../models/lookingForModel');

const filterObj = (obj, ...notAllowedFields) => {
  const newObj = {};
  Object.keys(obj).forEach(el => {
    if (!notAllowedFields.includes(el)) {
      newObj[el] = obj[el];
    }
  });
  return newObj;
};

// ME

exports.getMe = (req, res, next) => {
  req.params.id = req.user._id;
  next();
};
exports.deleteMe = catchAsync(async (req, res, next) => {
  await User.findByIdAndUpdate(req.user._id, { active: false });
  await LookingFor.deleteOne({ userId: req.user._id });
  res.status(204).json({
    status: 'success',
    data: null,
  });
});
exports.updateMe = catchAsync(async (req, res, next) => {
  if (req.body.password || req.body.passwordConfirm) {
    return new AppError(
      'This route is not for password update.Please use /update-password'
    );
  }

  const notAllowed = [
    'role',
    'verified',
    'manuallyVerified',
    'isClustered',
    'active',
    'password',
    'passwordConfirm',
  ];

  notAllowed.forEach(field => {
    if (Object.keys(req.body).includes(field)) delete req.body[field];
  });

  let updatedLookingFor;
  if (req.body.lookingFor) {
    updatedLookingFor = await LookingFor.findOneAndUpdate(
      { userId: req.user._id },
      {
        ...req.body.lookingFor,
      },
      {
        runValidators: true,
        new: true,
      }
    );
  }
  let updatedUser = await User.findByIdAndUpdate(req.user._id, req.body, {
    new: true,
    runValidators: true,
  });
  if (updatedLookingFor) {
    const { _doc } = { ...updatedUser };
    updatedUser = { ..._doc, lookingFor: updatedLookingFor };
  }
  res.status(200).json({
    status: 'success',
    data: {
      data: updatedUser,
    },
  });
});

// Returns populated connections of the logged in user
exports.getConnections = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.user._id).populate({
    path: 'connections',
    select: '-__v -flaggedCount',
  });
  const connections = user.connections;

  res.status(200).json({
    status: 'success',
    data: {
      data: connections,
    },
  });
});

// Returns populated friends of the logged in user
exports.getFriends = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.user._id).populate({
    path: 'friends',
    select: '-__v -flaggedCount',
  });
  const friends = user.friends;

  res.status(200).json({
    status: 'success',
    data: {
      friends,
    },
  });
});

//admin controllers

exports.deleteUser = catchAsync(async (req, res, next) => {
  const user = await User.findByIdAndDelete(req.params.id);
  if (!user) {
    return next(new AppError('No user found with that ID', 404));
  }
  res.status(200).json({
    status: 'success',
    data: null,
  });
});

exports.updateUser = catchAsync(async (req, res, next) => {
  const user = await User.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!user) {
    return next(new AppError('No user found with that ID', 404));
  }
  res.status(200).json({
    status: 'success',
    data: {
      data: user,
    },
  });
});

exports.getUser = catchAsync(async (req, res, next) => {
  let user = await User.findById(req.params.id);

  if (!user) {
    return next(new AppError('No user found with that ID', 404));
  }
  res.status(200).json({
    status: 'success',
    data: {
      data: user,
    },
  });
});

exports.getUsers = catchAsync(async (req, res, next) => {
  const features = new APIFeatures(User.find({}), req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate();

  const users = await features.query;

  res.status(200).json({
    status: 'success',
    results: users.length,
    data: {
      data: users,
    },
  });
});
