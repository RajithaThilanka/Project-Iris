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
const Admin = require('../models/adminModel');
const ManualVerification = require('../models/manualVerificationModel');
const { formatMils } = require('../utils/utilFuncs');
const Answer = require('../models/answerModel');
const Question = require('../models/questionModel');
const fs = require('fs');
const { dirname } = require('path');
const signToken = id =>
  jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

const createSendToken = (user, statusCode, res) => {
  const token = signToken(user._id);

  // res.cookie('jwt', token, {
  //   path: '/',
  //   expires: new Date(Date.now() + 1000 * 60 * 5),
  //   httpOnly: true,
  //   sameSite: 'lax',
  // });

  user.password = undefined;
  res.status(statusCode).json({
    status: 'success',
    token,
    data: {
      user: user,
    },
  });
};

const setupAnswerModel = async user => {
  await Answer.create({
    userId: user._id,
  });
  const questions = await Question.find({});
  // Shuffle array
  const shuffled = questions.sort(() => 0.5 - Math.random());

  // Get sub-array of first n elements after shuffled
  let selected = shuffled.slice(0, 50);
  const selectedIds = selected.map(el => el._id);
  await Answer.findOneAndUpdate(
    {
      userId: user._id,
    },
    {
      questions: selectedIds,
    }
  );
};

exports.setupLookingFor = catchAsync(async (req, res, next) => {
  const { lookingForGender, minAge, maxAge, minHeight, maxHeight, userId } =
    req.body;

  const newLookingFor = await LookingFor.create({
    userId,
    gender: lookingForGender,
    ageRange: {
      minAge,
      maxAge,
    },
    height: {
      minHeight,
      maxHeight,
    },
  });

  const newUserVerification = await UserVerification.create({
    userId,
  });

  const existingUser = await User.findById(userId);
  const confirmationToken = newUserVerification.createConfirmationToken();

  newUserVerification.save({ validateBeforeSave: false });

  const message = `<p>Verify your email address to complete the signup and login into your account.</p><p>This link <b>expires in 2 days</b></p><p>Press <a href=${
    process.env.FRONT_END_BASE_URL +
    'users/verify/' +
    userId +
    '/' +
    confirmationToken
  }>here</a> to proceed</p>`;
  try {
    await sendEmail({
      email: existingUser.email,
      subject: 'Please verify your account (Valid for 2 days)',
      message,
    });
    res.status(200).json({
      status: 'success',
      message: 'link sent to mail',
      data: null,
    });
  } catch (err) {
    return next(new AppError('There was an error sending the email!', 500));
  }
});

// exports.signup = catchAsync(async (req, res, next) => {
//   const notAllowed = [
//     'role',
//     'verified',
//     'manuallyVerified',
//     'isClustered',
//     'active',
//   ];

//   notAllowed.forEach(field => {
//     if (Object.keys(req.body).includes(field)) delete req.body[field];
//   });

//   let existingUser;

//   existingUser = await User.findOne({ email: req.body.email });
//   if (existingUser) {
//     return next(
//       new AppError('The email is already signed up. Login instead', 400)
//     );
//   }
//   const newUser = await User.create(req.body);
//   // setup answer model
//   setupAnswerModel(newUser);
//   // setup looking for
//   setupLookingFor(newUser, req);

//   const newUserVerification = await UserVerification.create({
//     userId: newUser._id,
//   });

//   const confirmationToken = newUserVerification.createConfirmationToken();

//   newUserVerification.save({ validateBeforeSave: false });
//   const message = `<p>Verify your email address to complete the signup and login into your account.</p><p>This link <b>expires in 2 days</b></p><p>Press <a href=${
//     process.env.FRONT_END_BASE_URL +
//     'users/verify/' +
//     newUser._id +
//     '/' +
//     confirmationToken
//   }>here</a> to proceed</p>`;
//   try {
//     await sendEmail({
//       email: newUser.email,
//       subject: 'Please verify your account (Valid for 2 days)',
//       message,
//     });
//     res.status(200).json({
//       status: 'success',
//       message: 'Message sent to email',
//       data: {
//         data: newUser,
//       },
//     });
//   } catch (err) {
//     return next(new AppError('There was an error sending the email!', 500));
//   }
// });

exports.signupAccountInfo = catchAsync(async (req, res, next) => {
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

  let existingUser;

  existingUser = await User.findOne({ email: req.body.email });
  if (existingUser) {
    return next(
      new AppError('The email is already signed up. Login instead', 400)
    );
  }
  const { firstname, lastname, email, password, passwordConfirm } = req.body;
  const newUser = await User.create({
    firstname,
    lastname,
    email,
    password,
    passwordConfirm,
  });
  // setup answer model
  setupAnswerModel(newUser);

  res.status(200).json({
    status: 'success',
    data: {
      data: newUser,
    },
  });
});

exports.signupUserInfo = catchAsync(async (req, res, next) => {
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

  const {
    gender,
    height,
    country,
    dob,
    languages,
    occupation,
    educationLevel,
    religion,
    ethnicity,
    monthlyIncome,
    hasChildren,
    userId,
  } = req.body;
  const updatedUser = await User.findByIdAndUpdate(
    userId,
    {
      gender,
      height,
      country,
      dob,
      languages,
      occupation,
      educationLevel,
      religion,
      ethnicity,
      monthlyIncome,
      hasChildren,
    },
    { new: true }
  );
  if (!updatedUser) {
    return next(new AppError('The email not signed up.', 400));
  }

  res.status(200).json({
    status: 'success',
    data: {
      data: updatedUser,
    },
  });
});

exports.signupProfileView = catchAsync(async (req, res, next) => {
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

  const { profilePhoto, userDescription, userId } = req.body;
  const existingUser = await User.findByIdAndUpdate(
    userId,
    {
      profilePhoto,
      userDescription,
    },
    { new: true }
  );
  if (!existingUser) {
    return next(new AppError('The email is not signed up', 400));
  }

  res.status(200).json({
    status: 'success',

    data: {
      data: existingUser,
    },
  });
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
  let token;
  if (req.headers.authorization)
    token = req.headers.authorization.split(' ')[1];
  // } else if (req.headers.cookie) {
  //   token = req.headers.cookie.split('=')[1];
  // }

  if (!token) {
    return next(
      new AppError('You are not logged in! Please login to access', 401)
    );
  }
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  const currentUser = await User.findById(decoded.id);
  if (!currentUser) {
    return next(
      new AppError('The user belonging to this token does no longer exist', 401)
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
        'You have to verify your email in order to access this service',
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

  // const message = `Forgot your password? Submit a PATCH request with your new password and passwordConfirm to:${resetURL}.`;
  let msg = fs.readFileSync(`${__dirname}/ResetPassword.html`, 'utf-8');
  msg = msg.replaceAll('$EMAIL_TITLE$', 'Forgot your password?');
  msg = msg.replaceAll(
    '$EMAIL_MESSAGE$',
    'A request has been received to change the password for your IRIS account. If you did not initiate this request, please ignore this email.'
  );
  msg = msg.replaceAll('$HOME_LINK$', `${process.env.FRONT_END_BASE_URL}home`);

  msg = msg.replaceAll(
    '$CTA_BTN_LINK$',
    `${process.env.FRONT_END_BASE_URL}users/reset-password/${resetToken}`
  );
  msg = msg.replaceAll('$CTA_BTN_TEXT$', `Reset Password`);
  try {
    await sendEmail({
      email: user.email,
      subject: 'Your password reset token (valid for 10mins)',
      message: msg,
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

exports.checkManualVerification = catchAsync(async (req, res, next) => {
  const verification = await ManualVerification.findOne({
    userId: req.user._id,
  });
  if (!verification) {
    return next(
      new AppError('You have to verify your account to access this service')
    );
  }
  if (verification?.status == 'verified') return next();
  else if (!verification || verification?.status == 'pending') {
    const allowedMs = 7 * 24 * 60 * 60 * 1000;
    const diffMs = Math.abs(Date.now() - req.user.createdAt);
    if (diffMs <= allowedMs) return next();
  }
});

// Admin login

exports.adminLogin = catchAsync(async (req, res, next) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return next(new AppError('Please provide an username and a password', 400));
  }
  const admin = await Admin.findOne({ username: username }).select('+password');
  if (!admin || !(await admin.correctPassword(password, admin.password))) {
    return next(new AppError('Incorrect username or password', 401));
  }
  createSendToken(admin, 200, res);
});

exports.adminProtect = catchAsync(async (req, res, next) => {
  let token;
  if (req.headers.authorization)
    token = req.headers.authorization.split(' ')[1];

  if (!token) {
    return next(
      new AppError('You are not logged in! Please login to access', 401)
    );
  }
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
  const currentUser = await Admin.findById(decoded.id);
  if (!currentUser) {
    return next(
      new AppError(`You don't have permission to perform this action`, 401)
    );
  }
  req.user = currentUser;
  next();
});
// Request manual verification
exports.requestManualVerify = catchAsync(async (req, res, next) => {
  const userId = req.user._id;
  const doc = await ManualVerification.findOne({
    userId: userId,
  });
  if (doc) {
    switch (doc.status) {
      case 'pending':
        return next(
          new AppError('Your manual verification request is pending!', 400)
        );
      case 'verified':
        return next(
          new AppError('Your account is already manually verified!', 400)
        );
      case 'failed': {
        const waitMs = 2 * 24 * 60 * 60 * 1000;
        const t = Math.abs(Date.now() - doc.createdAt);
        if (t < waitMs) {
          const { d, h, m, s } = formatMils(Math.abs(waitMs - t));
          return next(
            new AppError(
              `Your account verification has been failed. Please wait ${d} day ${h} hours ${m} minutes ${s} seconds before submitting another request`,
              400
            )
          );
        } else {
          await doc.deleteOne();
        }
      }
    }
  }
  const { liveFeed, nicPhoto } = req.body;
  const manualVerificationRequest = await ManualVerification.create({
    userId,
    liveFeed,
    nicPhoto,
  });

  res.status(200).json({
    status: 'success',
    data: {
      data: manualVerificationRequest,
    },
  });
});

exports.getAllVerificationRequests = catchAsync(async (req, res, next) => {
  const verificationRequests = await ManualVerification.find({
    status: 'pending',
  }).populate('userId');

  res.status(200).json({
    status: 'success',
    nRequests: verificationRequests.length,
    data: {
      data: verificationRequests,
    },
  });
});

// Verify manual verification
exports.verifyAccount = catchAsync(async (req, res, next) => {
  const verifiedUser = await ManualVerification.findOneAndUpdate(
    {
      userId: req.params.id,
    },
    {
      status: req.body.status,
    },
    {
      new: true,
      runValidators: true,
    }
  ).populate('userId');

  if (!verifiedUser) {
    return next(
      new AppError('Manual verification failed! No user found!', 404)
    );
  }
  res.status(200).json({
    status: 'success',
    data: {
      data: verifiedUser,
    },
  });
});
