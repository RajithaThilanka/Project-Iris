const catchAsync = require('../utils/catchAsync');
const User = require('../models/userModel');
const Flag = require('../models/flagModel');
const AppError = require('../utils/appError');
const request = require('request-promise');

const getUsersByIndex = async users => {
  const suggestedUserPromises = users.map(async user => {
    const u = await User.findOne({ index: user.index });
    return u;
  });
  return Promise.all(suggestedUserPromises);
};

exports.generateSuggestions = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.user._id);

  const isClustered = user.isClustered;
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
  const suggestedUsers = await getUsersByIndex(sentUsers);

  // Looking for

  // console.log(suggestedUsers);
  res.status(200).json({
    status: 'success',
    data: {
      data: suggestedUsers,
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
