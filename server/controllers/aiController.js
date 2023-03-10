const catchAsync = require('../utils/catchAsync');
const User = require('../models/userModel');
const AppError = require('../utils/appError');
const request = require('request-promise');
const LookingFor = require('../models/lookingForModel');
const Answer = require('../models/answerModel');
const Message = require('../models/messageModel');
const Report = require('../models/reportModel');
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
const generateUserSuggestions = async userId => {
  const lookingFor = await LookingFor.findOne({
    userId: userId,
  });

  const { minHeight, maxHeight } = lookingFor.height;

  const { minAge, maxAge } = lookingFor.ageRange;
  const maxYear = new Date(new Date().getFullYear() - minAge, 0);
  const minYear = new Date(new Date().getFullYear() - maxAge, 0);

  let suggestions = await User.find({
    $and: [
      {
        _id: { $ne: userId },
      },
      {
        $and: [
          { gender: lookingFor.gender },
          {
            dob: {
              $gte: minYear,
              $lte: maxYear,
            },
          },
          {
            height: {
              $gte: minHeight,
              $lte: maxHeight,
            },
          },
          {
            active: true,
          },
        ],
      },
    ],
  });
  suggestions = suggestions.slice(0, 10);

  let updatedSuggestionsPromises = suggestions.map(async user => {
    const l = await LookingFor.findOne({ userId });
    const p = await Answer.findOne({ userId });
    return { ...user, lookingFor: l, interests: p };
  });

  let updatedSuggestions = await Promise.all(updatedSuggestionsPromises);
  updatedSuggestions = updatedSuggestions.map(sug => {
    const { _doc, lookingFor, interests } = sug;
    return { ..._doc, lookingFor: lookingFor, interests: interests };
  });
  // console.log(updatedSuggestions);
  return updatedSuggestions;
  // res.status(200).json({
  //   status: 'success',
  //   results: suggestions.length,
  //   data: {
  //     data: updatedSuggestions,
  //   },
  // });
};

exports.generateSuggestions = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.user._id);
  const passions = await Answer.findOne({ userId: req.user._id });
  const isClustered = user.isClustered;
  const ageDifMs = Date.now() - user.dob.getTime();
  const ageDate = new Date(ageDifMs); // miliseconds from epoch
  const Age = Math.abs(ageDate.getUTCFullYear() - 1970);
  const userData = {
    Bios: passions.profileDescription,
    Religion: user.religion,
    Politics: passions.politics,
    Movies: passions.movies,
    Music: passions.music,
    Social_Media: passions.socialMedia,
    Sports: passions.sports,
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
  let suggestions = await getUsersByIndex(sentUsers);
  await User.findByIdAndUpdate(req.user._id, { isClustered: true });
  // const filteredUsers = filterByLookingFor(aiSuggestedUsers);
  // suggestions = suggestions.slice(0, 10);

  let updatedSuggestionsPromises = suggestions.map(async user => {
    const l = await LookingFor.findOne({ userId: user._id });
    const p = await Answer.findOne({ userId: user._id });
    return { ...user, lookingFor: l, interests: p };
  });

  let updatedSuggestions = await Promise.all(updatedSuggestionsPromises);
  updatedSuggestions = updatedSuggestions.map(sug => {
    const { _doc, lookingFor, interests } = sug;
    return { ..._doc, lookingFor: lookingFor, interests: interests };
  });
  // Looking for
  const userSuggestions = await generateUserSuggestions(req.user._id);

  // console.log(userSuggestions);
  updatedSuggestions = [...updatedSuggestions, ...userSuggestions];
  res.status(200).json({
    status: 'success',
    nSuggestions: updatedSuggestions.length,
    data: {
      data: updatedSuggestions,
    },
  });
});

// Hate speech detection
exports.validateChat = async () => {
  const newMessages = await Message.find({
    validated: false,
  }).populate('sender');

  const updatedMessages = newMessages.map(msg => {
    return {
      id: msg.sender._id,
      text: msg.content,
    };
  });

  const options = {
    method: 'POST',
    url: 'http://127.0.0.1:9000/api/v1/users/detect-hate-speech',
    body: updatedMessages,
    json: true,
  };
  const response = await request(options);

  await Message.updateMany({ validated: false }, { validated: true });
  console.log(response);
  response.forEach(async result => {
    if (result.flagged === 'Hate Speech Detected') {
      await Report.create({
        reportedUser: result.id,
        reason: 'Hate Speech',
        reviewStatus: 'positive',
      });
    }
  });
};

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
