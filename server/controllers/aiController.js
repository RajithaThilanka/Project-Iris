const catchAsync = require('../utils/catchAsync');
const User = require('../models/userModel');
const AppError = require('../utils/appError');
const request = require('request-promise');
const LookingFor = require('../models/lookingForModel');

const getUsersByIndex = async users => {
  const suggestedUserPromises = users.map(async user => {
    const u = await User.findOne({ index: user.index });
    return u;
  });
  return Promise.all(suggestedUserPromises);
};

const filterByLookingFor = (users, lookingFor) => {
  const { minAge, maxAge } = lookingFor.ageRange;
  const { gender } = lookingFor;

  const filteredUsers = users.filter(user => {
    return (
      user.gender == gender && user.age >= minAge - 5 && user.age <= maxAge + 10
    );
  });
  return filteredUsers;
};

exports.generateSuggestions = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.user._id);

  // const isClustered = user.isClustered;
  const isClustered = true;
  const ageDifMs = Date.now() - user.dob.getTime();
  const ageDate = new Date(ageDifMs); // miliseconds from epoch
  const Age = Math.abs(ageDate.getUTCFullYear() - 1970);
  const userData = {
    Bios: user.profileDescription,
    Religion: user.religion,
    Politics: user.politics,
    Movies: user.movies,
    Music: user.music,
    Social_Media: user.socialMedia,
    Sports: user.sports,
    Age,
    isClustered,
  };

  const options = {
    method: 'POST',
    url: 'http://127.0.0.1:9000/api/v1/users/generate-suggestions',
    body: userData,
    json: true,
  };

  const sentUsers = await request(options);
  const aiSuggestedUsers = await getUsersByIndex(sentUsers);
  const filteredUsers = filterByLookingFor(aiSuggestedUsers);

  // Looking for

  res.status(200).json({
    status: 'success',
    data: {
      data: filteredUsers,
    },
  });
});

exports.generateUserSuggestions = catchAsync(async (req, res, next) => {
  const lookingFor = await LookingFor.findOne({
    userId: req.user._id,
  });

  const { minHeight, maxHeight } = lookingFor.height;
  const { minAge, maxAge } = lookingFor.ageRange;
  const maxYear = new Date(new Date().getFullYear() - minAge, 0);
  const minYear = new Date(new Date().getFullYear() - maxAge, 0);

  const suggestions = await User.find({
    gender: lookingFor.gender,

    dob: {
      $gte: minYear,
      $lte: maxYear,
    },
    height: {
      $gte: minHeight,
      $lte: maxHeight,
    },
    active: true,
  });
  res.status(200).json({
    status: 'success',
    results: suggestions.length,
    data: {
      data: suggestions,
    },
  });
});

// Hate speech detection
exports.validateChat = catchAsync(async (req, res, next) => {});

// exports.getLatestIndex = catchAsync(async (req, res, next) => {
//   const options = {
//     method: 'GET',
//     url: 'http://127.0.0.1:9000/api/v1/users/get-lastest-index',
//     json: true,
//   };

//   const sendRequest = await request(options);
//   console.log(sendRequest);
//   res.status(200).json({
//     status: 'success',
//     data: {
//       data: sendRequest,
//     },
//   });
// });
