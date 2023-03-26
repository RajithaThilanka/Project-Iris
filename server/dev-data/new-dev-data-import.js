const mongoose = require('mongoose');
const fs = require('fs');

const User = require(`../models/userModel`);
const Answer = require('../models/answerModel');
const Date = require('../models/dateModel');

const dotenv = require('dotenv');

dotenv.config({ path: '../config.env' });

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);

const Chat = require('../models/chatModel');
const Message = require('../models/messageModel');
const LookingFor = require('../models/lookingForModel');
const Connection = require('../models/connectionsModel');
mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => console.log('DB Connection successful'));

const deleteDevData = async () => {
  try {
    // await Chat.deleteMany();
    // await Message.deleteMany();
    // await User.deleteMany();
    // await LookingFor.deleteMany();
    await Chat.deleteMany();
    await Message.deleteMany();
    await Connection.deleteMany();
    await Date.deleteMany();
    // await Answer.deleteMany();
  } catch (error) {
    console.log(error);
  }
};

// deleteDevData();
// const generate = (min, max) => Math.floor(Math.random() * (max - min) + min);
// const urlsArr = [
//   'https://www.youtube.com/embed/a4M5HT3Poxo',
//   'https://www.youtube.com/embed/91lyHjYHgHQ',
//   'https://www.youtube.com/embed/-lkEOEEKYD0',
//   'https://www.youtube.com/embed/QDX-1M5Nj7s',
//   'https://www.youtube.com/embed/dOxlEwX9lbA',
//   'https://www.youtube.com/embed/6YaH04MZRmg',
// ];
// const users = JSON.parse(fs.readFileSync('./fianlLooking.json', 'utf-8'));
// const topUsers = JSON.parse(fs.readFileSync('./top.json', 'utf-8'));
// console.log(users.length);

// const newUsers = users.map((user, i) => {
//   const photoId1 = generate(0, 73);
//   const photoId2 = generate(0, 73);

//   const profilePicId = generate(0, 73);
//   return {
//     ...user,
//     profilePhoto: `user${profilePicId}.JPEG`,
//     active: true,
//     verified: true,
//     password: '$2a$12$m3NYg1ZMKVvoRKsrZ4W4g.rVsIvgrGomMiKFFlQDKAAZVyD2MBDSO',
//     passwordConfirm:
//       '$2a$12$m3NYg1ZMKVvoRKsrZ4W4g.rVsIvgrGomMiKFFlQDKAAZVyD2MBDSO',
//     isClustered: true,
//     callTag: user.lastname + ' ' + user.firstname[0] + '.',
//     index: i + 10,
//     suspended: false,
//     photos: [`user${photoId1}.JPEG`, `user${photoId2}.JPEG`],
//     urls: [
//       urlsArr[generate(0, urlsArr.length - 1)],
//       urlsArr[generate(0, urlsArr.length - 1)],
//       urlsArr[generate(0, urlsArr.length - 1)],
//     ],
//   };
// });

// fs.writeFileSync('./test-new-users.json', JSON.stringify(newUsers), 'utf-8');
const lookingFor = JSON.parse(fs.readFileSync('./new.json', 'utf-8'));

console.log(lookingFor.length);
