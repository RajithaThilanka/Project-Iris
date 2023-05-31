const catchAsync = require('../utils/catchAsync');
const User = require('../models/userModel');
const Connection = require('../models/connectionsModel');
const AppError = require('../utils/appError');
const request = require('request-promise');
const LookingFor = require('../models/lookingForModel');
const Answer = require('../models/answerModel');
const Message = require('../models/messageModel');
const ManualVerification = require('../models/manualVerificationModel');
const Report = require('../models/reportModel');
const getUsersByIndex = async users => {
  let suggestedUserPromises = users.map(async user => {
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
            $or: [
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
            ],
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
    const l = await LookingFor.findOne({ userId: user._id });
    const p = await Answer.findOne({ userId: user._id });
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
    Religion: user.religion.charAt(0).toUpperCase() + user.religion.slice(1),
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
  try {
    let sentUsers = await request(options);
    let suggestions = await getUsersByIndex(sentUsers);
    suggestions = suggestions.filter(s => s);
    suggestions = suggestions.filter(s => s._id + '' != req.user._id + '');
    await User.findByIdAndUpdate(req.user._id, { isClustered: true });
    // const filteredUsers = filterByLookingFor(aiSuggestedUsers);
    // suggestions = suggestions.slice(0, 10);

    const connections = await Connection.find({
      $or: [{ senderId: req.user._id }, { receiverId: req.user._id }],
    });

    const conIds = connections.map(con => {
      return '' + con.senderId == req.user._id
        ? '' + con.receiverId
        : '' + con.senderId;
    });

    let userSuggestions = await generateUserSuggestions(req.user._id);
    suggestions = suggestions.filter(s => {
      return !conIds.includes(s._id + '');
    });
    userSuggestions = userSuggestions.filter(s => {
      return !conIds.includes(s._id + '');
    });

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

    updatedSuggestions = [...updatedSuggestions, ...userSuggestions];
    updatedSuggestions = await Promise.all(
      updatedSuggestions.map(async u => {
        let status = false;
        const verificationStatus = await ManualVerification.findOne({
          userId: u._id,
        });
        if (!verificationStatus) status = false;
        else if (verificationStatus.status === 'verified') status = true;
        return { ...u, verStatus: status };
      })
    );

    updatedSuggestions = updatedSuggestions.sort(() => 0.5 - Math.random());
    res.status(200).json({
      status: 'success',
      nSuggestions: updatedSuggestions.length,
      data: {
        data: updatedSuggestions,
      },
    });
  } catch (error) {
    return next(
      new AppError(
        'We have trouble connecting to AI. Please try again later',
        500
      )
    );
  }
});

// Hate speech detection
exports.validateChat = async () => {
  try {
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

    response.forEach(async result => {
      if (result.flagged === 'Hate Speech Detected') {
        await Report.create({
          reportedUser: result.id,
          reason: 'Hate Speech',
          reviewStatus: 'positive',
        });
      }
    });
    return response;
  } catch (error) {
    console.log(error);
  }
};

exports.getValidatedResponse = catchAsync(async (req, res, next) => {
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
  response.forEach(async result => {
    if (result.flagged === 'Hate Speech Detected') {
      await Report.create({
        reportedUser: result.id,
        reason: 'Hate Speech',
        reviewStatus: 'positive',
      });
    }
  });
  const updatedResponse = await Promise.all(
    response.map(async resp => {
      const user = await User.findById(resp.id);
      return { ...resp, id: user };
    })
  );
  res.status(200).json({
    status: 'success',
    data: {
      data: updatedResponse,
    },
  });
});

exports.generateTagSuggestions = catchAsync(async (req, res, next) => {
  const { tag } = req.body;
  const tagUsers = await Answer.find({
    $and: [
      {
        userId: { $ne: req.user._id },
      },
      {
        $or: [
          {
            movies: {
              $in: [tag],
            },
          },
          {
            music: {
              $in: [tag],
            },
          },
          {
            politics: {
              $in: [tag],
            },
          },
          {
            socialMedia: {
              $in: [tag],
            },
          },
          {
            sports: {
              $in: [tag],
            },
          },
          {
            profileDescription: { $regex: tag, $options: 'i' },
          },
        ],
      },
    ],
  }).populate('userId');

  if (tagUsers.length === 0) {
    return next(new AppError('No suggestions at the moment', 400));
  }
  let filteredTagUsers = tagUsers.map(u => {
    return u.userId;
  });

  filteredTagUsers = filteredTagUsers.slice(0, 50);

  let updatedSuggestionsPromises = filteredTagUsers.map(async user => {
    const l = await LookingFor.findOne({ userId: user._id });
    const p = await Answer.findOne({ userId: user._id });
    return { ...user, lookingFor: l, interests: p };
  });

  let updatedSuggestions = await Promise.all(updatedSuggestionsPromises);
  updatedSuggestions = updatedSuggestions.map(sug => {
    const { _doc, lookingFor, interests } = sug;
    return { ..._doc, lookingFor: lookingFor, interests: interests };
  });

  res.status(200).json({
    status: 'success',
    results: updatedSuggestions.length,
    data: {
      data: updatedSuggestions,
    },
  });
});

exports.runClusters = catchAsync(async (req, res, next) => {
  try {
    const options = {
      method: 'GET',
      url: 'http://127.0.0.1:9000/api/v1/users/cluster',
      json: true,
    };
    const response = await request(options);

    if (response.code === 200) {
      res.status(200).json({
        status: 'success',
        message: 'User profiles clustering success',
      });
    } else {
      return next(new AppError('Something went wrong', 500));
    }
  } catch (error) {
    return next(new AppError('Something went wrong', 500));
  }
});
