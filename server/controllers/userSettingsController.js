const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const UserSettings = require('../models/userSettings');

exports.checkSearchTokens = catchAsync(async (req, res, next) => {
  let tokens = await UserSettings.findOne({ userId: req.user._id });
  if (!tokens) {
    const newTokenSetting = await UserSettings.create({
      userId: req.user._id,
      searchTokens: {
        count: 3,
        expiresIn: Date.now() + 24 * 60 * 60 * 1000,
      },
    });
    tokens = newTokenSetting;
  }

  //   console.log(tokens.searchTokens.tokenDate);
  if (
    tokens.searchTokens.count <= 0 &&
    new Date(tokens.searchTokens.expiresIn).getTime() - Date.now() >= 0
  ) {
    return next(new AppError('Tokens have expired.Try again later', 400));
  } else if (
    new Date(tokens.searchTokens.expiresIn).getTime() - Date.now() <
    0
  ) {
    tokens.searchTokens.count += 3;
    tokens.searchTokens.expiresIn = Date.now() + 24 * 60 * 60 * 1000;
    await tokens.save();
  }
  if (tokens.searchTokens.count > 0) {
    tokens.searchTokens.count -= 1;
    await tokens.save();
  }
  const updatedToken = await UserSettings.findOne({ userId: req.user._id });
  req.body.tokenInfo = updatedToken;
  return next();
});

exports.getSearchTokens = catchAsync(async (req, res, next) => {
  let tokens = await UserSettings.findOne({ userId: req.user._id });
  if (!tokens) {
    const newTokenSetting = await UserSettings.create({
      userId: req.user._id,
      searchTokens: {
        count: 3,
        expiresIn: Date.now() + 24 * 60 * 60 * 1000,
      },
    });
    tokens = newTokenSetting;
  }

  //   console.log(tokens.searchTokens.tokenDate);
  if (
    tokens.searchTokens.count <= 0 &&
    new Date(tokens.searchTokens.expiresIn).getTime() - Date.now() >= 0
  ) {
    return next(new AppError('Tokens have expired.Try again later', 400));
  } else if (
    new Date(tokens.searchTokens.expiresIn).getTime() - Date.now() <
    0
  ) {
    tokens.searchTokens.count += 3;
    tokens.searchTokens.expiresIn = Date.now() + 24 * 60 * 60 * 1000;
    await tokens.save();
  }
  //   if (tokens.searchTokens.count > 0) {
  //     tokens.searchTokens.count -= 1;
  //     await tokens.save();
  //   }
  const updatedToken = await UserSettings.findOne({
    userId: req.user._id,
  }).populate('userId');

  return res.status(200).json({
    status: 'success',
    data: {
      data: updatedToken,
    },
  });
});
