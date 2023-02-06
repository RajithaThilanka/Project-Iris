const User = require('../models/userModel');
const catchAsync = require('../utils/catchAsync');
const jwt = require('jsonwebtoken');
const AppError = require('../utils/appError');
const { promisify } = require('util');
const sendEmail = require('../utils/email');
const crypto = require('crypto');
const UserVerification = require('../models/useVerificationModel');
const request = require('request-promise');
const LookingFor = require('../models/lookingForModel');

const signToken = id =>
  jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

const createSendToken = (user, statusCode, res) => {
  const token = signToken(user._id);

  res.cookie('jwt', token, {
    path: '/',
    expires: new Date(Date.now() + 1000 * 60 * 5),
    httpOnly: true,
    sameSite: 'lax',
  });

  user.password = undefined;
  res.status(statusCode).json({
    status: 'success',
    token,
    data: {
      user: user,
    },
  });
};

exports.signup = catchAsync(async (req, res, next) => {
  const notAllowed = [
    'role',
    'verified',
    'manuallyVerified',
    'isClustered',
    'active',
  ];

  notAllowed.forEach(field => {
    if (Object.keys(req.body).includes(field)) delete req.body[field];
  });
  const { lookingFor } = req.body;
  delete req.body.lookingFor;

  let existingUser;

  existingUser = await User.findOne({ email: req.body.email });
  if (existingUser) {
    return next(
      new AppError('The email is already signed up. Login instead', 400)
    );
  }
  const newUser = await User.create(req.body);
  const newLookingFor = await LookingFor.create({
    userId: newUser._id,
    ...lookingFor,
  });
  const newUserVerification = await UserVerification.create({
    userId: newUser._id,
  });

  const confirmationToken = newUserVerification.createConfirmationToken();

  newUserVerification.save({ validateBeforeSave: false });
  const message = `<p>Verify your email address to complete the signup and login into your account.</p><p>This link <b>expires in 2 days</b></p><p>Press <a href=${
    process.env.CURRENT_URL +
    'users/verify/' +
    newUser._id +
    '/' +
    confirmationToken
  }>here</a> to proceed</p>`;
  try {
    await sendEmail({
      email: newUser.email,
      subject: 'Please verify your account (Valid for 2 days)',
      message,
    });
    res.status(200).json({
      status: 'success',
      message: 'Message sent to email',
      data: {
        data: newUser,
      },
    });
  } catch (err) {
    return next(new AppError('There was an error sending the email!', 500));
  }
});

exports.verify = catchAsync(async (req, res, next) => {
  const { uniqueString, id } = req.params;
  const hashedToken = crypto
    .createHash('sha256')
    .update(uniqueString)
    .digest('hex');
  const userVerify = await UserVerification.findOne({
    userId: id,
    uniqueString: hashedToken,
    expiresAt: { $gt: Date.now() },
  });
  if (!userVerify) {
    return next(new AppError('Token is invalid or has expired', 400));
  }
  userVerify.uniqueString = undefined;
  await userVerify.save();
  const updatedUser = await User.findByIdAndUpdate(
    id,
    {
      verified: true,
    },
    {
      runValidators: false,
      new: true,
    }
  );
  createSendToken(updatedUser, 200, res);
});

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(new AppError('Please provide an email and a password', 400));
  }
  const user = await User.findOne({ email: email }).select('+password');
  if (!user || !(await user.correctPassword(password, user.password))) {
    return next(new AppError('Incorrect email or password', 401));
  }
  createSendToken(user, 200, res);
});

exports.protect = catchAsync(async (req, res, next) => {
  const cookies = req.headers.cookie;
  const token = cookies ? cookies.split('=')[1] : null;

  if (!token) {
    return next(
      new AppError('You are not logged in! Please login to access', 401)
    );
  }
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  const currentUser = await User.findById(decoded.id);
  if (!currentUser) {
    return new AppError(
      'The user belonging to this token does no longer exist',
      401
    );
  }
  if (currentUser.changedPasswordAfter(decoded.iat)) {
    return next(
      new AppError('User recently changed password! Please login again!', 401)
    );
  }

  if (currentUser.verified == false) {
    return next(
      new AppError(
        'You have to verify your account in order to access this service',
        401
      )
    );
  }
  req.user = currentUser;

  next();
});

exports.restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new AppError(`You don't have permission to perform this action`, 403)
      );
    }
    next();
  };
};

exports.forgotPassword = catchAsync(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    return next(new AppError('There is no user with email address', 404));
  }
  const resetToken = user.createPasswordResetToken();

  await user.save({ validateBeforeSave: false });

  const resetURL = `${req.protocol}://${req.get(
    'host'
  )}/api/v1/users/reset-password/${resetToken}`;

  const message = `Forgot your password? Submit a PATCH request with your new password and passwordConfirm to:${resetURL}.`;

  try {
    await sendEmail({
      email: user.email,
      subject: 'Your password reset token (valid for 10mins)',
      message,
    });
    res.status(200).json({
      status: 'success',
      message: 'Token sent to email',
    });
  } catch (err) {
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save({ validateBeforeSave: false });
    return next(new AppError('There was an error sending the email!', 500));
  }
});

exports.resetPassword = catchAsync(async (req, res, next) => {
  const hashedToken = crypto
    .createHash('sha256')
    .update(req.params.token)
    .digest('hex');
  const user = await User.findOne({
    passwordResetToken: hashedToken,
    passwordResetExpires: { $gt: Date.now() },
  });
  if (!user) {
    return next(new AppError('Token is invalid or has expired', 400));
  }
  user.password = req.body.password;
  user.passwordConfirm = req.body.passwordConfirm;
  user.passwordResetToken = undefined;
  user.passwordResetExpires = undefined;
  await user.save();

  createSendToken(user, 200, res);
});

exports.updatePassword = async (req, res, next) => {
  const user = await User.findById(req.user._id).select('+password');
  if (!(await user.correctPassword(req.body.passwordCurrent, user.password))) {
    return next(new AppError('You current password is wrong', 401));
  }
  user.password = req.body.password;
  user.passwordConfirm = req.body.passwordConfirm;
  await user.save();
  createSendToken(user, 200, res);
};

exports.getLatestIndex = catchAsync(async (req, res, next) => {
  const options = {
    method: 'GET',
    url: 'http://127.0.0.1:9000/api/v1/users/get-lastest-index',
    json: true,
  };

  const sendRequest = await request(options);
  req.body.index = sendRequest + 1;
  next();
});

exports.verifyAccount = catchAsync(async (req, res, next) => {
  const user = await User.findByIdAndUpdate(
    req.params.id,
    {
      manuallyVerified: true,
    },
    {
      runValidators: false,
      new: true,
    }
  );
  res.status(200).json({
    status: 'success',
    data: {
      data: user,
    },
  });
});

exports.checkManualVerification = (req, res, next) => {
  if (!req.user.manuallyVerified) {
    return next(
      new AppError(
        'You have to verify your identity to access this service',
        401
      )
    );
  }
  next();
};
